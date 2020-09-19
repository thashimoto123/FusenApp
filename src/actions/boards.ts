import { IBoard } from 'core';
import { LayoutType } from 'constants/index';

export const UPDATE_BOARDS = 'UPDATE_BOARDS';
export const UPDATE_CURRENT_BOARD = 'UPDATE_CURRENT_BOARD';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const UPDATE_SORT = 'UPDATE_SORT';

export const updateBoards = (payload: {boards: IBoard[] }) => ({
  type: UPDATE_BOARDS as typeof UPDATE_BOARDS,
  payload
});

export const updateCurrentBoard = (payload: {currentId: string}) => ({
  type: UPDATE_CURRENT_BOARD as typeof UPDATE_CURRENT_BOARD,
  payload
});

export const updateLayout = (payload: {layout: LayoutType}) => ({
  type: UPDATE_LAYOUT as typeof UPDATE_LAYOUT,
  payload
})

export const updateSort = (payload: {sort: string}) => ({
  type: UPDATE_SORT as typeof UPDATE_SORT,
  payload
})