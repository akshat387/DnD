import React from 'react'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
function MainPage() {
    const { isOver, setNodeRef } = useDroppable({
        id: 'main-page',
      });
    
      const style = {
        minHeight: '200px',
    border: isOver ? '2px dashed #000' : 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
      };
    
  return (
    <div ref={setNodeRef} style={style}>Drop here</div>
  )
}

export default MainPage
