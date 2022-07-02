import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "styles/Modal.module.css";
const $ = require("jquery");

const Topup = ({ show, setShow, onClose }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [url, setUrl] = useState(null);
  const { token } = useSelector((state) => state.persist.user.userInfo);
  useEffect(() => {
    (() => {
      setMessage(null);
      setError(null);
      setUrl(null);
      $("input[data-type='currency']").on({
        keyup: function () {
          formatCurrency($(this));
        },
        blur: function () {
          formatCurrency($(this), "blur");
        },
      });

      function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      function formatCurrency(input, blur) {
        let input_val = input.val();

        if (input_val === "") {
          return;
        }

        let original_len = input_val.length;

        let caret_pos = input.prop("selectionStart");

        if (input_val.indexOf(".") >= 0) {
          let decimal_pos = input_val.indexOf(".");

          // split number by decimal point
          let left_side = input_val.substring(0, decimal_pos);
          let right_side = input_val.substring(decimal_pos);

          // add commas to left side of number
          left_side = formatNumber(left_side);

          // validate right side
          right_side = formatNumber(right_side);

          // On blur make sure 2 numbers after decimal
          if (blur === "blur") {
            right_side += "00";
          }

          // Limit decimal to only 2 digits
          right_side = right_side.substring(0, 2);

          // join number by .
          input_val = "Rp" + left_side + "." + right_side;
        } else {
          // no decimal entered
          // add commas to number
          // remove all non-digits
          input_val = formatNumber(input_val);
          input_val = "Rp" + input_val;

          // final formatting
          if (blur === "blur") {
            input_val += ".00";
          }
        }

        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        let updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
      }
    })();
  }, [show]);
  const confirmTopup = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    setUrl(null);

    const value = e.target["currency-field"].value;

    const amount = value.split("Rp")[1].split(".")[0].replaceAll(",", "");

    const body = {
      amount,
    };
    axios
      .post(`${process.env.API_HOST}/transaction/top-up`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        const { redirectUrl } = result.data.data;
        setLoading(false);
        setMessage(result.data.msg);
        setUrl(redirectUrl);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response ? err.response.data.msg : err.message);
      });
  };
  return (
    <>
      <Modal size={"md"} centered show={show} onHide={onClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className={`${styles.modalTitle} ms-2`}>Topup</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={`${styles.modalDesc} ms-2`}>Enter the amount of money, and click submit</p>
          <form onSubmit={confirmTopup} id="topup" className="d-flex my-3 justify-content-center ">
            <input type="text" name="currency-field" autoFocus={true} id="currency-field" data-type="currency" required className={`${styles.passwordPin} mt-4 `} />
          </form>
          {loading && <p className="text-center">Please Wait...</p>}
          {error && <p className={`${styles.errorAuth} mt-3`}>{error}</p>}
          {message && (
            <>
              <p className={`${styles.successAuth} mt-3`}>{message}</p>
              <p
                className={`${styles.redirectUrl} text-center`}
                onClick={() => {
                  window.open(url, "_blank");
                  setShow(false);
                }}
              >
                Click here to pay for top up
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {loading ||
            (!message && (
              <Button
                style={{
                  backgroundColor: "#6379F4",
                  color: "white",
                  borderRadius: "12px",
                  height: "57px",
                  width: "30%",
                }}
                type="submit"
                form="topup"
              >
                Submit
              </Button>
            ))}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Topup;
