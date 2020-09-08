import { Reducer } from 'redux';
import { IColor, initialColors } from 'core';
import * as actions from 'actions/colors';

type Action = ReturnType<typeof actions.updateColors>
export type State = IColor[];

export const initialColorsState: State = initialColors;

const colorsReducer: Reducer<State, Action> = (state = initialColorsState, action) => {
  switch(action.type) {
    case actions.UPDATE_COLORS:
      return action.payload.colors
      
    default:
      return state;
  }
}

export default colorsReducer