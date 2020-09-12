import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import LayoutFreeBoard from 'components/LayoutFreeBoard';
import Board from 'components/Board';
import { BoardsUseCase, IBoardsUseCase } from 'core';
import { useBoardsPresentation } from 'presentations/boards';
import { useBoardsLocalStorageRepository } from 'repositories/boards';
import { LayoutType, LAYOUT_FREE, LAYOUT_SORT} from 'constants/index';

function App() {
  const [, setLoading] = useState<boolean>(false);
  const useCase = useRef<IBoardsUseCase>(useCaseFactory(setLoading));
  const layout = useSelector(state => state.boards.layout);

  useEffect(() => {
    useCase.current.findAll();
  }, [useCase]);

  return (
    <div className="App">
      {
        renderBoard(layout)
      }
    </div>
  );
}

export default App;

const useCaseFactory = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const repository = useBoardsLocalStorageRepository();
  const presentation = useBoardsPresentation({setLoading});
  return new BoardsUseCase(repository, presentation);
}

const renderBoard = (layout: LayoutType) => {
  switch(layout) {
    case LAYOUT_FREE:
      return <LayoutFreeBoard />;

    case LAYOUT_SORT:
      return <Board />
    default:
      return <LayoutFreeBoard />;
  }
}