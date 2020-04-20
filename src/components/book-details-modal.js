import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./modal.css";
import BookDetails from "./book-details";

function BookDetailsModal(props) {
  return (
    <Modal open={props.open} onClose={props.onClose} center>
      <BookDetails json={props.json} />
    </Modal>
  );
}

export default BookDetailsModal;
