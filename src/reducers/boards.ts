import { Reducer } from 'redux';
import * as actions from 'actions/boards';
import { LayoutType, LAYOUT_FREE } from 'constants/index';

type Action = ReturnType<typeof actions.updateBoards> | ReturnType<typeof actions.updateCurrentBoard> | ReturnType<typeof actions.updateLayout> | ReturnType<typeof actions.updateSort>

export type BoardType = {
  id: string
}

export type State = {
  currentId: string
  isLocal: boolean,
  boards: BoardType[],
  layout: LayoutType,
  sort: string
};

export const initialBoardState: State = {
  currentId: '0',
  isLocal: true,
  boards: [{id: '0'}],
  layout: LAYOUT_FREE,
  sort: 'text'
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

    case actions.UPDATE_LAYOUT:
      return {
        ...state,
        layout: action.payload.layout
      }

    case actions.UPDATE_SORT:
      return {
        ...state,
        sort: action.payload.sort
      }

    default:
      return state;
  }
}

export default boardsReducer