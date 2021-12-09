import { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

function NoteDeleteModal(props) {
  let [password, setPassword] = useState("");

  function handleChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleShow();
    deleteNote();
  }

  async function deleteNote() {
    try {
      await axios.delete("http://localhost:3000/notes/deleteNotes", {
        data: { password, _id: props._id },
      });
      props.setUpdated(true);
    } catch (error) {
      alert("An error occured! Please try again");
      console.log("error", error);
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Delete the note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="mr-5">Enter Password</label>
            <input
              className="form-control"
              type="password"
              required
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default NoteDeleteModal;
