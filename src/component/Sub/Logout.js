import { useRouter } from "next/router";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removetransaction } from "reduxStore/Actions/transAction";
import { userLogout } from "reduxStore/Actions/UserAction";
import ToastMessage from "./Toast";

const Logout = ({ show, onClose, setShow }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Modal size={"md"} centered show={show} onHide={onClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to logout ?</Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#6379F4",
            }}
            onClick={() => {
              setShow(false);
              dispatch(userLogout());
              dispatch(removetransaction());

              setTimeout(() => {
                ToastMessage({ type: "success", message: "You have successfully logged out" });
                router.push("/");
              }, 2000);
            }}
          >
            Yes
          </Button>
          <Button
            style={{
              backgroundColor: "#3A3D421A",
              border: "none",
              color: "black",
            }}
            onClick={onClose}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Logout;
