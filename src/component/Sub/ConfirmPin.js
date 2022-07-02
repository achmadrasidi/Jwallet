import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "styles/Modal.module.css";
import { PinInput } from "react-input-pin-code";

const ConfirmPin = ({ show, onClose, setShow }) => {
  const [error, setError] = useState(null);
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.persist.user.userInfo);

  const { receiver, transAmount, notes } = useSelector((state) => state.persist.transaction.transItem);
  const router = useRouter();
  const confirmPin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const pin = values.map((val) => val).join("");
    axios
      .get(`${process.env.API_HOST}/user/pin?pin=${pin}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        const body = {
          receiverId: receiver.id,
          amount: transAmount,
          notes,
        };
        axios
          .post(`${process.env.API_HOST}/transaction/transfer`, body, { headers: { Authorization: `Bearer ${token}` } })
          .then(() => {
            setLoading(false);
            setShow(false);
            router.push("/dashboard/transfer/status");
          })
          .catch((err) => {
            setLoading(false);
            router.push({
              pathname: "/dashboard/transfer/status/[error]",
              query: { error: err.response ? err.response.data.msg : err.message },
            });
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response ? err.response.data.msg : err.message);
      });
  };
  return (
    <Modal size={"md"} centered show={show} onHide={onClose} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={`${styles.modalTitle}`}>Enter PIN to Transfer</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={`${styles.modalDesc}`}>Enter your 6 digits PIN for confirmation to continue transferring money.</p>
        <form
          onSubmit={confirmPin}
          onChange={() => {
            setError(null);
          }}
          id="pin"
          className="d-flex my-3 justify-content-center "
        >
          <PinInput values={values} size={"lg"} className={`${styles.passwordPin} mt-5`} onChange={(_value, _index, val) => setValues(val)} />
        </form>
        {error && <p className={`${styles.errorAuth}`}>{error}</p>}
        {loading && <p className="text-center">Please wait...</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="pin"
          style={{
            backgroundColor: "#6379F4",
            color: "white",
            borderRadius: "12px",
            height: "57px",
            width: "30%",
          }}
        >
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmPin;
