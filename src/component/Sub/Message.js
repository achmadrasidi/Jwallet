import React from "react";
import { Button, Modal } from "react-bootstrap";

const Message = ({ message, show, onClose }) => {
  return (
    <Modal size={"md"} centered show={show} onHide={onClose} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "#6379F4",
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Message;
