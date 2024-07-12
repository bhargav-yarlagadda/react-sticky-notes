import React, { createRef, useEffect, useRef } from 'react';
import Note from './Note';

const Notes = ({ notes = [], setNotes = () => {} }) => {
  const noteRefs = useRef({});

  const handleDragStart = (note, e) => {
    const { id } = note;
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const startPos = note.position;
    // once the final pos is retrived after moving the finger, this function will be exectued , it retrives the note with the id that has been moved, and we set the new position and save it in the local storage.
    const updateNotePosition = (id, newPos) => {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, position: newPos } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };


    // every time we drag the client X and Y change we set that to note using noteRef obtained when we clcik on that
    const handleMouseMove = (e) => {
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;
      let maxX = window.innerWidth - rect.width;
      let maxY = window.innerHeight - rect.height;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const checkForOverlap = (id) => {
      const currentNoteRef = noteRefs.current[id].current;
      const currentRect = currentNoteRef.getBoundingClientRect();
  
      return notes.some((note) => {
        if (note.id === id) return false;
  
        const otherNoteRef = noteRefs.current[note.id].current;
        const otherRect = otherNoteRef.getBoundingClientRect();
  
        const overlap = !(
          currentRect.right < otherRect.left ||
          currentRect.left > otherRect.right ||
          currentRect.bottom < otherRect.top ||
          currentRect.top > otherRect.bottom
        );
  
        return overlap;
      });
    };
  

    // once we complete dragging we no longer need mouse up and mouse move listener we remove them so that we can prevent any mis touches
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPos = { x: finalRect.left, y: finalRect.top };
      if(checkForOverlap(id)){
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`; 
      }else{
      // Update position
      updateNotePosition(id, newPos);
      }
    };
    // this is part of handleDragStart every time we start dragging these listeners are added and we are able to move them,and once released handleMouseUp is exected.
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const determineNewPosition = () => {
    const maxY = window.innerHeight - 250;
    const maxX = window.innerWidth - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    console.log("executed")
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });
    console.log("executed!!")
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    console.log("executed!!!")

  }, [notes.length]);

  return (
    <div>
      {notes.map((note) => {
        if (!noteRefs.current[note.id]) {
          noteRefs.current[note.id] = createRef();
        }
        return (
          <Note
            key={note.id}
            ref={noteRefs.current[note.id]}
            initialPos={note.position}
            description={note.description}
            onMouseDown={(e) => handleDragStart(note, e)}
          />
        );
      })}
    </div>
  );
};

export default Notes;
