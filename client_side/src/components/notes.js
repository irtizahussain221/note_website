import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlusSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import NoteCreateModal from "./noteCreateModal";
import NoteDeleteModal from "./notesDeleteModal";
import NotesUpdateModal from "./notesUpdateModal";

function Notes(props) {
  let [folderNotes, setFolderNotes] = useState([]);
  let [isUpdated, setUpdated] = useState(false);
  let [isLoading, setLoading] = useState(false);
  let [error, setError] = useState(false);

  let [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  let [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => {
    setDeleteShow(!deleteShow);
  };

  let [updateShow, setUpdateShow] = useState(false);
  const handleUpdateShow = () => {
    setUpdateShow(!updateShow);
  };

  useEffect(async () => {
    if (props.folderID) {
      setLoading(true);
      try {
        let data = await axios.get(
          `https://demo-notes-website.herokuapp.com/notes/${props.folderID}/notesList`
        );
        setLoading(false);
        setError(false);
        setFolderNotes(data.data);
        setUpdated(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
        alert("An error occured! Try refreshing the page!");
      }
    }
  }, [props.folderID, isUpdated]);

  if (!props.folderID) return <div>No Folder selected yet</div>;
  if (isLoading)
    return (
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  if (error) return <div>There is an error</div>;

  return (
    <div>
      {folderNotes === null ? (
        <div>No note in this folder</div>
      ) : (
        folderNotes.map((note, key) => {
          let date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(note.createdAt)));

          return (
            <div key={key}>
              <div className="row m-1">
                <div
                  className="col-12 link"
                  onClick={() => {
                    let password = prompt("Type the password for this note");
                    props.setNoteID(note._id);
                    props.setPassword(password);
                  }}
                >
                  {note.name}
                </div>
                <div className="col-6">{date}</div>
                <div className="col-6">
                  <FontAwesomeIcon
                    className="hover-item"
                    style={{ color: "rgb(204, 201, 201)" }}
                    icon={faTrashAlt}
                    onClick={handleDeleteShow}
                  />
                  <NoteDeleteModal
                    show={deleteShow}
                    handleShow={handleDeleteShow}
                    setUpdated={setUpdated}
                    _id={note._id}
                  />
                  <FontAwesomeIcon
                    className="hover-item ml-2"
                    style={{ color: "rgb(204, 201, 201)" }}
                    icon={faEdit}
                    onClick={handleUpdateShow}
                  />
                  <NotesUpdateModal
                    show={updateShow}
                    handleShow={handleUpdateShow}
                    setUpdated={setUpdated}
                    _id={note._id}
                    folder={props.folderID}
                  />
                </div>
              </div>
              <hr />
            </div>
          );
        })
      )}
      <div className="add-note">
        <FontAwesomeIcon
          className="hover-item"
          style={{ color: "rgb(204, 201, 201)" }}
          icon={faPlusSquare}
          onClick={handleShow}
        />{" "}
        Add a note
      </div>
      <NoteCreateModal
        show={show}
        setUpdated={setUpdated}
        handleShow={handleShow}
        folder={props.folderID}
      />
    </div>
  );
}

export default Notes;
