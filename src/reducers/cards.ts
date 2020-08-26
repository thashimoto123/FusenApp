import { Reducer } from 'redux';
import { ICard } from 'core/entities/card';
import * as actions from 'actions/cards';
import { uuid } from 'uuidv4';

type Action = ReturnType<typeof actions.updateCards>

export type State = ICard[];

export const initialCardState = {
  id: uuid(),
  text: '',
  labels: [],
  color: 'white',
  position: {
    x: 0,
    y: 0,
    z: 0
  }
}
export const initialCardsState: State = [{
  id: '0',
  text: 'text',
  color: 'white',
  labels: [],
  position: {
    x: 0,
    y: 0,
    z: 0
  }
}];

const CardsReducer: Reducer<State, Action> = (state = initialCardsState, action) => {
  switch(action.type) {
    case actions.UPDATE_CARDS:
      return action.payload.cards;

    default:
      return state;
  }
}

export default CardsReducer;