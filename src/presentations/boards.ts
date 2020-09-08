import React from 'react';
import { IBoard,IBoardsPresentation } from 'core';
import { useDispatch } from 'react-redux';  
import  * as actions  from 'actions';

type Option = {
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useBoardsPresentation = (option: Option):IBoardsPresentation => {
  const dispatch = useDispatch();
  const viewBoardAll = (boards: IBoard[]) => {
    const board = boards[0];
    dispatch(actions.updateBoards({boards}));
    dispatch(actions.updateCards({cards: board.cards}));
    dispatch(actions.updateColors({colors: board.colors}));
    dispatch(actions.updateLabelNames({labelNames: board.labelNames}));
    dispatch(actions.updateCurrentBoard({currentId: board.id}));
  };
  const viewBoard = (board: IBoard) => {
    dispatch(actions.updateCards({cards: board.cards}));
    dispatch(actions.updateColors({colors: board.colors}));
    dispatch(actions.updateLabelNames({labelNames: board.labelNames}));
    dispatch(actions.updateCurrentBoard({currentId: board.id}));
  };
  const notFindBoard = () => {};
  const notFindBoardAll = () => {};
  const setLoading = option.setLoading ? option.setLoading :  () => {};

  return {
    setLoading,
    viewBoard,
    viewBoardAll,
    notFindBoard,
    notFindBoardAll
  }
}