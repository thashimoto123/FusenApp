import React, { useState, useEffect, useRef } from 'react';
import DroppableBoard from 'components/DroppableBoard';
import CustomDragLayer from 'components/CustomDragLayer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BoardsUseCase, IBoardsUseCase } from 'core';
import { useBoardsPresentation } from 'presentations/boards';
import { useBoardsLocalStorageRepository } from 'repositories/boards';

function App() {
  const [, setLoading] = useState<boolean>(false);
  const useCase = useRef<IBoardsUseCase>(useCaseFactory(setLoading));

  useEffect(() => {
    useCase.current.findAll();
  }, [useCase]);

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