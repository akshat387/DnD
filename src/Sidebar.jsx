import React from 'react'
import { useDraggable } from '@dnd-kit/core';
function Sidebar({ id, name }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
      });
      const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
        cursor: 'grab',
        padding: '10px',
        backgroundColor: '#e0e0e0',
        border: '1px solid #ccc',
        borderRadius: '0px', // Sharp edges
        width: '150px', // Adjust width as needed
        textAlign: 'center',
        borderTopRightRadius: '5px', // Rounded only top-right corner
        borderBottomRightRadius: '5px', 
      };
    
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    {name}
  </div>
);
  
}

export default Sidebar
