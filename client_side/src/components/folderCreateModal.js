import { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

function CreateFolderModal(props) {
  let [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.handleShow();
    createFolder();
  }

  async function createFolder() {
    try {
      const body = { name: name };
      let result = await axios.post(
        "http://localhost:3000/folders/createFolder",
        body
      );
      props.setUpdated(true);
    } catch (error) {
      alert("An error occured! Please try again");
      console.log("error", error);
    }
  }
  return (
    <Modal show={props.show} onHide={props.handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new folder</Modal.Title>
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
                setName(e.target.value);
              }}
              placeholder="Type the name of folder"
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

export default CreateFolderModal;
