import { Reducer } from 'redux';
import { Card } from 'entities/card';
import cardListUsecase from 'usecases/cardList';
import * as actions from 'actions/cardList';
import { uuid } from 'uuidv4';

type Action = ReturnType<typeof actions.addCard | typeof actions.removeCard | typeof actions.editCard>

export type State = Card[];

export const initialCardState = {
  id: uuid(),
  text: '',
  label: [],
  color: 'white',
  position: {
    x: 0,
    y: 0,
    z: 0
  }
}
export const initialCardListState: State = [{
  id: '0',
  text: 'text',
  color: 'white',
  label: [],
  position: {
    x: 0,
    y: 0,
    z: 0
  }
}];

const cardListReducer: Reducer<State, Action> = (state = initialCardListState, action) => {
  switch(action.type) {
    case actions.ADD_CARD:
      return cardListUsecase.addCard(initialCardState, state);

    case actions.REMOVE_CARD:
      return cardListUsecase.removeCard(action.payload.id, state);

    case actions.EDIT_CARD:
      return cardListUsecase.editCard(action.payload.card, state);

    default:
      return state;
  }
}

export default cardListReducer;