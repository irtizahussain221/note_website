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
      <div className="container m-0">
        <div className="row">
          <div className="col-3">
            <Folders setFolderID={setFolderID} />
          </div>
          <div className="col-4">
            <Notes
              folderID={folderID}
              setNoteID={setNoteID}
              setPassword={setPassword}
            />
          </div>
          <div className="col-5">
            <NoteText password={password} noteID={noteID} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
