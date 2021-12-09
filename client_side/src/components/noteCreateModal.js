import { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

function NoteCreateModal(props) {
  let [name, setName] = useState("");
  let [text, setText] = useState("");
  let [password, setPassword] = useState("");

  function setProperty(e, propertySetter) {
    propertySetter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    postNote();
    props.handleShow();
  }

  async function postNote() {
    let data = {
      folder: props.folder,
      name: name,
      text: text,
      password,
    };
    try {
      let result = await axios.post(
        "http://localhost:3000/notes/createNotes",
        data
      );
      console.log(result);
      props.setUpdated(true);
    } catch (error) {
      alert("An error occured! Please try again");
      console.log("error", error);
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Add a note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="mr-5">Name</label>
            <input
              required
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => {
                setProperty(e, setName);
              }}
            />
          </div>
          <div className="form-group">
            <label className="mr-5">Text</label>
            <input
              required
              type="text"
              className="form-control"
              value={text}
              onChange={(e) => {
                setProperty(e, setText);
              }}
            />
          </div>
          <div className="form-group">
            <label className="mr-5">Password</label>
            <input
              required
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setProperty(e, setPassword);
              }}
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

export default NoteCreateModal;
