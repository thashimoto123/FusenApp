import { Reducer } from 'redux';
import { IColor } from 'core/entities/card';

export type State = IColor[];

export const initialColorsState: State = ['rgb(246, 236, 191)','rgb(215, 231, 248)','rgb(246, 198, 228)'];

const colorsReducer: Reducer<State> = (state = initialColorsState) => {
  return state;
}

export default colorsReducer