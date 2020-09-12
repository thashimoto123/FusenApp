import { Reducer } from 'redux';
import * as actions from 'actions/boards';
import { LayoutType, LAYOUT_FREE, LAYOUT_SORT } from 'constants/index';

type Action = ReturnType<typeof actions.updateBoards> | ReturnType<typeof actions.updateCurrentBoard>

export type BoardType = {
  id: string
}

export type State = {
  currentId: string
  isLocal: boolean,
  boards: BoardType[],
  layout: LayoutType
};

export const initialBoardState: State = {
  currentId: '0',
  isLocal: true,
  boards: [{id: '0'}],
  layout: LAYOUT_SORT
};

const boardsReducer: Reducer<State,Action> = (state = initialBoardState, action) => {
  switch(action.type) {
    case actions.UPDATE_BOARDS:
      return {
        ...state,
        currentId: action.payload.boards[0].id,
        boards: action.payload.boards
      };

    case actions.UPDATE_CURRENT_BOARD:
      return {
        ...state,
        currentId: action.payload.currentId,
      };

    default:
      return state;
  }
}

export default boardsReducer