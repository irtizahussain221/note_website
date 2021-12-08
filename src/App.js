import Folders from "./components/folders";
import Notes from "./components/notes";
import TypingArea from "./components/typingArea";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Folders />
          </div>
          <div className="col-4">
            <Notes />
          </div>
          <div className="col-6">
            <TypingArea />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
