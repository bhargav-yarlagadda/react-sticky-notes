import { useState } from "react"
import Notes from "./components/Notes";
const App = () => {
  
  const [notes,setNotes]= useState([{id:1,description:"this is the default note."},{id:2,description:"Learn practise evolve"}]);
  const [note, setNote] = useState("");
  return (
    <div>
          <div className="flex bg-yellow-200 justify-center p-3">
        <input className="rounded-xl p-2"
          type="textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => {
            if(note){
            setNotes([...notes, {id: notes.length + 1, description: note}]);
            setNote("");
            }
          }}
        >
          Add Note
        </button>
      </div>
      <Notes notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App
