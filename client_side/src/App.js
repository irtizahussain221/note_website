import { useState } from "react";
import Folders from "./components/folders";
import Notes from "./components/notes";
import NoteText from "./components/noteText";

function App() {
  let [folderID, setFolderID] = useState("");
  let [noteID, setNoteID] = useState("");
  let [password, setPassword] = useState("");

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 folder-column">
            <Folders setFolderID={setFolderID} />
          </div>
          <div className="col-4 notes-column">
            <Notes
              folderID={folderID}
              setNoteID={setNoteID}
              setPassword={setPassword}
            />
          </div>
          <div className="col text-column">
            <NoteText password={password} noteID={noteID} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
