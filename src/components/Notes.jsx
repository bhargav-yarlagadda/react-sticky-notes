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

    const updateNotePosition = (id, newPos) => {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, position: newPos } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPos = { x: finalRect.left, y: finalRect.top };

      // Update position
      updateNotePosition(id, newPos);
    };

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
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }, [notes.length, setNotes]);

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
