import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";

function NotesUpdateModal(props) {
  let [name, setName] = useState("");
  let [text, setText] = useState("");
  let [password, setPassword] = useState("");

  function setProperty(e, propertySetter) {
    propertySetter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateShow();
    setName("");
    setText("");
    setPassword("");
    props.handleShow();
  }

  async function updateShow() {
    let data = {
      _id: props._id,
      name,
      text,
      password,
      folder: props.folder,
    };
    try {
      await axios.put(
        "https://demo-notes-website.herokuapp.com/notes/updateNotes",
        data
      );
      props.setUpdated(true);
    } catch (error) {
      if (error.message === "Request failed with status code 401")
        return alert("Incorrect Password");
      alert("Some error occured! Please check your password and try again!");
      console.log("error: ", error);
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Update a note</Modal.Title>
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

export default NotesUpdateModal;
