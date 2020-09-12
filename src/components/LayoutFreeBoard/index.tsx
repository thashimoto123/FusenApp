import React from 'react';
import DroppableBoard from 'components/DroppableBoard';
import CustomDragLayer from 'components/CustomDragLayer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const LayoutFreeBoard = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DroppableBoard />
      <CustomDragLayer />
    </DndProvider>
  )
}

export default LayoutFreeBoard