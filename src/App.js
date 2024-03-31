import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable} from '@dnd-kit/core';
import Modal from 'react-modal';
import './App.css';
import Sidebar from './Sidebar';
import MainPage from './MainPage';
const disableDefaultDragOverlay = () => null;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropPosition, setDropPosition] = useState({ x: 0, y: 0 });
  const [config, setConfig] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [renderedText, setRenderedText] = useState(null);
  const [selectedText, setSelectedText] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [elements, setElements] = useState([]); // State to manage elements
  const [font, setFont] = useState('Arial');
  // Define sidebar elements
  const sidebarElements = [
    { id: 'label', name: 'Label' },
    { id: 'input', name: 'Input' },
    { id: 'button', name: 'Button' },
  ];

  useEffect(() => {
    Modal.setAppElement('#root');
    loadElementsFromLocalStorage();
    document.addEventListener('keydown', handleKeyPress); // Add event listener for key press
    return () => {
      document.removeEventListener('keydown', handleKeyPress); // Remove event listener on component unmount
    };
  }, []);

  useEffect(() => {
    if (selectedText) {
      openConfigModal();
    }
  }, [selectedText]);

  // Function to load elements from local storage
  const loadElementsFromLocalStorage = () => {
    const storedElements = localStorage.getItem('elements');
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  };

  // Function to save elements to local storage
  const saveElementsToLocalStorage = (updatedElements) => {
    localStorage.setItem('elements', JSON.stringify(updatedElements));
  };

  // Function to open the configuration modal
  const openConfigModal = () => {
    setIsModalOpen(true);
  };

  

  const onDragEnd = (event) => {
    const { clientX, clientY } = event;
    setDropPosition({ x: clientX, y: clientY });
    setIsModalOpen(true);
    // Set config to the new drop position
    setConfig({ x: clientX, y: clientY });
  };

  const saveConfig = () => {
    // Draw the text on the page with the configurations entered by the user
    setRenderedText(
      <div
      className={selectedText ? 'selected-text' : 'text-component'} // Apply different class based on selection
        onClick={() => setSelectedText(true)}
        style={{
          position: 'absolute',
          top: `${config.y}px`,
          left: `${config.x}px`,
          fontFamily: font,
        }}
      >
        {text}
      </div>
      
    );
    const updatedElements = elements.map((element) => {
      if (element.id === selectedText.id) {
        return { ...element, config };
      }
      return element;
    });
    setElements(updatedElements);
    saveElementsToLocalStorage(updatedElements);
    setIsModalOpen(false);
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    if (selectedText) {
      const updatedElements = elements.filter((element) => element.id !== selectedText.id);
      setElements(updatedElements);
      saveElementsToLocalStorage(updatedElements);
      setSelectedText(null);
    }
  };
  
  const handleKeyPress = (event) => {
    console.log('Key pressed:', event.key);
    if (event.key === 'Delete') {
      handleDelete(); // Delete element on Delete press
    }
  };

 
  const DraggableText = () => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: 'draggable-text',
      transform: { x: config.x, y: config.y },
      onDragStart: () => setDragging(true),
      onDragEnd: (event) => {
        const { clientX, clientY } = event;
        setConfig({ x: clientX, y: clientY });
        setDragging(false); // Reset dragging state
      },
    });
    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        handleDelete();
      }
    };
    
  
    return (
      <div
        {...attributes}
        ref={setNodeRef}
        style={{
          position: 'absolute',
          top: `${transform ? transform.y : config.y}px`,
          left: `${transform ? transform.x : config.x}px`,
          cursor: dragging ? 'grabbing' : 'grab',
          border: selectedText ? '2px solid red' : 'none',
        }}
        // onClick={() => setSelectedText({ id: Date.now(), config: { x: config.x, y: config.y } })} // Set selected text on click
        // onKeyPress={handleKeyPress} // Handle key presses
        // tabIndex={0} 
        onKeyDown={handleKeyDown}
      tabIndex={0}
        {...listeners}
      >
        {text}
      </div>
    );
  };
  
  
  
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: 'draggable-item',
    onDragEnd: onDragEnd
  });
  

  return (
    <DndContext onDragEnd={onDragEnd} dragOverlay={disableDefaultDragOverlay}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', height: '100vh', marginTop: '50px' }}>
        <MainPage />
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', backgroundColor: 'black', padding: '20px' }}>
          <div style={{ marginBottom: '8px', alignSelf: 'flex-start', color: 'white' }}>BLOCKS</div>
          
          {sidebarElements.map((element, index) => (
            <div key={element.id} style={{ marginBottom: '10px' }}>
              <Sidebar key={element.id} id={element.id} name={element.name} />
              
            </div>
          ))}
        </div>
        <DraggableText />
        <div
      className="text-component"
      style={{
        position: 'absolute',
        top: `${config.y}px`,
        left: `${config.x}px`,
      }}
      onClick={() => setSelectedText(null)}
    >
      {/* {renderedText} */}
      {/* {renderedText && <div className="selected-border" />} */}
      
    </div>
  </div>
      
       {/* Include rendered text here */}
       <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="custom-modal" overlayClassName="custom-overlay">
  <div style={{ padding: '20px' }}>
    <h2 style={{ marginBottom: '20px' }}>Configuration</h2>
    <div style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>X Coordinate:</label>
      <input
        type="number"
        value={config.x}
        onChange={(e) => setConfig({ ...config, x: parseInt(e.target.value) })}
        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Y Coordinate:</label>
      <input
        type="number"
        value={config.y}
        onChange={(e) => setConfig({ ...config, y: parseInt(e.target.value) })}
        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Text:</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Font:</label>
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
      >
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
        {/* Add more font options as needed */}
      </select>
    </div>
    <button
      onClick={saveConfig}
      style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
    >
      Save Changes
    </button>
  </div>
</Modal>

    </DndContext>
  );
}

export default App;