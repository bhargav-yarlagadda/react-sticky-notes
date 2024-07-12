import React, { createRef, useEffect, useRef } from 'react'
import Note from './Note'


const  determineNewPosition =()=>{
  const maxY = window.innerHeight -250;
  const maxX = window.innerWidth -250
  return {
    x:Math.floor(Math.random()*maxX),
    y:Math.floor(Math.random()*maxY),

  }
}
const noteRefs = useRef([])
// 
const Notes = ({notes=[],setNotes=()=>{}}) => {
  useEffect(()=>{
    const savedNotes=JSON.parse(localStorage.getItem("notes"))||[]
    const updatedNotes = notes.map((note)=>{
      const savedNote=savedNotes.find((n)=> n.id == note.id);
      if(savedNote){
        return {...note,position:savedNote.position}
      }else{
        const position = determineNewPosition()
        return {...note,position}
      }
    }
  )   
  setNotes(updatedNotes)
  localStorage.setItem("notes",JSON.stringify(updatedNotes))
  },[notes.length])

  return (
    <div>

      {
      notes.map((note)=>
        {
        return <Note key={note.id}   ref={noteRef.current[note.id]?
          noteRef.current[note.id]:
          (noteRef.current[note.id]=createRef())} 
          initialPos={note.position} 
          description={note.description}
          onMouseDown={(e)=>handleDragStart(note.id,e)}  />
        }
      )
    }
    </div>
  )
}

export default Notes
