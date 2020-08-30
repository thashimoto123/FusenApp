import { Reducer } from 'redux';
import { IColor, initialColors } from 'core';

export type State = IColor[];

export const initialColorsState: State = initialColors;

const colorsReducer: Reducer<State> = (state = initialColorsState) => {
  return state;
}

export default colorsReducer