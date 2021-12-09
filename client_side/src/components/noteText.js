import axios from "axios";
import { useEffect, useState } from "react";

function NoteText(props) {
  let [note, setNote] = useState([]);
  let [isLoading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let [errMess, setErrMess] = useState("");

  useEffect(() => {
    if (props.noteID || props.password) {
      fetchNote();
    }
  }, [props.noteID, props.password]);

  async function fetchNote() {
    let data = {
      _id: props.noteID,
      password: props.password,
    };
    try {
      setLoading(true);
      let response = await axios.post(
        "http://localhost:3000/notes/getNote",
        data
      );
      setNote(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        alert("Incorrect Password");
        setError(true);
        setLoading(false);
        setErrMess("Your Password is incorrect");
      } else {
        setError(true);
        setLoading(false);
        setErrMess("Some error occured! Please try again!");
        alert("Some error occured! Please check your password and try again!");
        console.log("error: ", error);
      }
    }
  }

  if (!props.noteID || !props.password) return <div>No Note Selected!</div>;
  if (isLoading || !note[0])
    return (
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  if (error) return <div>{errMess}</div>;
  return <div>{note[0].text}</div>;
}

export default NoteText;
