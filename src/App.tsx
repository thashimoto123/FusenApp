import React, { useState, useEffect } from 'react';
import InputWithSuggestion from 'components/InputWithSuggestion';
import DroppableBoard from 'components/DroppableBoard';
import CustomDragLayer from 'components/CustomDragLayer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BoardsUseCase } from 'core';
import { useBoardsPresentation } from 'presentations/boards';
import { useBoardsLocalStorageRepository } from 'repositories/boards';

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
  const [loading, setLoading] = useState<boolean>(false);
  const useCase = useCaseFactory(setLoading);

  useEffect(() => {
    useCase.findAll();
  }, []);

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

const useCaseFactory = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const repository = useBoardsLocalStorageRepository();
  const presentation = useBoardsPresentation({setLoading});
  return new BoardsUseCase(repository, presentation);
}