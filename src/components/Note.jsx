import React, { forwardRef } from 'react'
const Note = forwardRef(({description,initialPos,...props},ref) => {
  return (
    <div  
    ref={ref} style={{
      position: "absolute",
      left: `${initialPos?.x}px`,
      top: `${initialPos?.y}px`}} >
        <div className={`select-none border-2 border-black p-2 w-[200px] cursor-move bg-orange-300`} {...props}>
          📌 
          {description}
          </div>
    
    </div>
  )
})

export default Note