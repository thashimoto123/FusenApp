import { Reducer } from 'redux';
import { ILabelName, initialLabelNames } from 'core';
import * as actions from 'actions/labelNames';

type Action = ReturnType<typeof actions.updateLabelNames>
export type State = ILabelName[];

const labelNamesReducer: Reducer<State, Action> = (state = initialLabelNames, action) => {
  switch(action.type) {
    case actions.UPDATE_LABELNAMES:
      return action.payload.labelNames

    default:
      return state;
  }
}

export default labelNamesReducer