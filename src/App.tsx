import React from 'react';
import InputWithSuggestion from 'components/InputWithSuggestion';
import DroppableBoard from 'components/DroppableBoard';
import CustomDragLayer from 'components/CustomDragLayer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from 'components/Card';

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: 'calc(100vw - 40px)',
  minHeight: '100vh',
}

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <DroppableBoard />
        <CustomDragLayer />
      </DndProvider>
    </div>
  );
}

export default App;
