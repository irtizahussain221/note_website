import { useState, useEffect } from "react";
import { faPlusSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateFolderModal from "./folderCreateModal";
import axios from "axios";

function Folders(props) {
  let [folders, setFolders] = useState([]);
  let [isLoading, setLoading] = useState(true);
  let [isError, setError] = useState(false);
  let [isUpdated, setUpdated] = useState(false);

  let [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  const handleDelete = async (_id) => {
    try {
      let result = await axios.delete(
        "http://localhost:3000/folders/deleteFolder",
        {
          data: {
            _id,
          },
        }
      );
      setUpdated(true);
    } catch (error) {
      alert("An error occured! Please try again");
      console.log("error", error);
    }
  };

  useEffect(async () => {
    try {
      let result = await fetch("http://localhost:3000/folders/getFolders");
      let data = await result.json();
      setLoading(false);
      setFolders(data);
      setUpdated(false);
    } catch (error) {
      alert("Some error occured! Please try to reload!");
      console.log("error: ", error);
      setLoading(false);
      setUpdated(false);
      setError(true);
    }
  }, [isUpdated]);

  if (isError)
    return (
      <div className="alert alert-danger">
        Some error occured! Try reloading the page or check your internet
        connection!
      </div>
    );
  if (isLoading)
    return (
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div>
      {folders.map((folder, key) => {
        return (
          <div key={key} className="row">
            <p
              className="col-8"
              onClick={() => {
                props.setFolderID(folder._id);
              }}
            >
              {folder.name}
            </p>
            <p className="col-2">1</p>
            <div className="col-2">
              <FontAwesomeIcon
                className="hover-item"
                style={{ color: "green" }}
                icon={faTrashAlt}
                onClick={() => {
                  handleDelete(folder._id);
                }}
              />
            </div>
          </div>
        );
      })}
      <FontAwesomeIcon
        className="hover-item"
        style={{ color: "green" }}
        icon={faPlusSquare}
        onClick={handleShow}
      />{" "}
      New Folder
      <CreateFolderModal
        setUpdated={setUpdated}
        show={show}
        handleShow={handleShow}
      />
    </div>
  );
}

export default Folders;
