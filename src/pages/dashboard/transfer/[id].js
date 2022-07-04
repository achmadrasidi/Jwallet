import styles from "styles/Dashboard.module.css";
import Image from "next/image";
import { DashLayout } from "component/DashLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pencil } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "component/Sub/Loading";
import axios from "axios";
import { addTransaction } from "reduxStore/Actions/transAction";
import $ from "jquery";

const TransferDetail = () => {
  const [receiver, setReceiver] = useState({});
  const [transAmount, setTransAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.persist.user.userInfo);
  const user = useSelector((state) => state.persist.user.userDetail);
  const currencyFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });

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

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { id } = router.query;
        const result = await axios.get(`${process.env.API_HOST}/user/profile/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result.data;
        setLoading(false);
        setReceiver(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <DashLayout title={"Zwallet - Transfer Detail"}>
        <div className="col-md-8 my-5 ms-4" id={styles.dashTop}>
          <div className="row">
            <div className={`col-md-12 ${styles.midContentDashBot}`}>
              <div className="row p-5 pb-4">
                <div className="col-md-12">
                  <h2 className={`${styles.searchTitle} mt-2`}>Transfer Money</h2>
                </div>
              </div>
              <div className={`row mt-0 m-5 pt-4 p-3 ${styles.searchItem}`}>
                <div className="col-md-12 d-flex gap-3 ">
                  <div className="">
                    <Image src={receiver.image ? `${process.env.CLOUDINARY_URL}${receiver.image}` : require("assets/img/default-img.webp")} className={styles.defaultImg} width={50} height={50} />
                  </div>
                  <div className="">
                    <h3 className={`${styles.transName}`}>{`${receiver.firstName ? receiver.firstName : "John"} ${receiver.lastName ? receiver.lastName : "Doe"}`}</h3>
                    <p className={`${styles.transStatus} mt-2`}>{receiver.noTelp ? "0" + receiver.noTelp : "No Phone Number"}</p>
                  </div>
                </div>
              </div>
              <p className={`${styles.detailDesc} m-5`}>
                Type the amount you want to transfer and then <br /> press continue to the next steps.
              </p>
              <div className="text-center mt-5">
                <input
                  type="text"
                  className={`${styles.amountInput} text-center border-0`}
                  name="currency-field"
                  id="currency-field"
                  data-type="currency"
                  placeholder="0.00"
                  onChange={(e) => {
                    setError(null);
                    const { value } = e.target;
                    setTransAmount(value);
                  }}
                />
                <p className={`${styles.currBalance} mt-4`}>{currencyFormatter.format(user.balance)} Available</p>
                <Pencil className={`${styles.pencilIcon}`} />
                <input
                  type="text"
                  className={`${styles.detailInput} mt-3 mb-5`}
                  onChange={(e) => {
                    setError(null);
                    setNotes(e.target.value);
                  }}
                  placeholder="Add some notes"
                />
                {error && <p className={`${styles.errorAuth} mb-5`}>{error}</p>}
              </div>
              <div className="text-end mb-5 me-4">
                <button
                  className={`${styles.continueButton}`}
                  onClick={() => {
                    const amount = transAmount.split("Rp")[1].replaceAll(",", "");
                    const numberFormat = /^\d+$/;
                    if (!amount.match(numberFormat)) {
                      setError("Invalid Number Format");
                      return;
                    }
                    if (Number(amount) > Number(user.balance)) {
                      setError("Not enough balance");
                      return;
                    }
                    if (!notes) {
                      setError("Please add some notes");
                      return;
                    }
                    dispatch(addTransaction(receiver, amount, notes));
                    router.push("/dashboard/transfer/confirm");
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};
// Jquery Dependency

export default TransferDetail;
