import { Reducer } from 'redux';
import { ILabelName, initialLabelNames } from 'core/entities/board';

export type State = ILabelName[];


const labelNamesReducer: Reducer<State> = (state = initialLabelNames) => {
  return state;
}

export default labelNamesReducer