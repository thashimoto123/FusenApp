import { Reducer } from 'redux';
import * as actions from 'actions/boards';

type Action = ReturnType<typeof actions.updateBoards> | ReturnType<typeof actions.updateCurrentBoard>

export type BoardType = {
  id: string
}
export type State = {
  currentId: string
  isLocal: boolean,
  boards: BoardType[]
};

export const initialBoardState: State = {
  currentId: '0',
  isLocal: true,
  boards: [{id: '0'}]
};

const boardsReducer: Reducer<State,Action> = (state = initialBoardState, action) => {
  switch(action.type) {
    case actions.UPDATE_BOARDS:
      return {
        currentId: action.payload.boards[0].id,
        isLocal: true,
        boards: action.payload.boards
      };

    case actions.UPDATE_CURRENT_BOARD:
      return {
        ...state,
        currentId: action.payload.currentId,
        isLocal: true,
      };

    default:
      return state;
  }
}

export default boardsReducer