import { IBoard } from 'core';

export const UPDATE_BOARDS = 'UPDATE_BOARDS';
export const UPDATE_CURRENT_BOARD = 'UPDATE_CURRENT_BOARD';

export const updateBoards = (payload: {boards: IBoard[] }) => ({
  type: UPDATE_BOARDS as typeof UPDATE_BOARDS,
  payload
});
export const updateCurrentBoard = (payload: {currentId: string}) => ({
  type: UPDATE_CURRENT_BOARD as typeof UPDATE_CURRENT_BOARD,
  payload
});