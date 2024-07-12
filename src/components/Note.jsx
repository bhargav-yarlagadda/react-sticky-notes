import React from 'react'
const Note = ({description,initialPos,...props}) => {
  return (
    <div   style={{
      position: "absolute",
      left: `${initialPos?.x}px`,
      top: `${initialPos?.y}px`}} >
        <div className={`absolute select-none border-2 border-black p-2 w-[200px] cursor-move bg-yellow-200`} {...props}>
          📌 
          {description}
          </div>
    
    </div>
  )
}

export default Note
