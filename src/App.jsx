import { useState } from "react"
import Notes from "./components/Notes";
const App = () => {
  
  const [notes,setNotes]= useState([{id:1,description:"this is the default note."}]);
  return (
    <div>

      <Notes notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App
