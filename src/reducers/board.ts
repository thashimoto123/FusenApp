import { Reducer } from 'redux';

export type State = {
  id: string,
  isLocal: boolean
};

export const initialBoardState: State = {
  id: '0',
  isLocal: true
};

const boardReducer: Reducer<State> = (state = initialBoardState) => {
  return state;
}

export default boardReducer