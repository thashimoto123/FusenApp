import {Reducer} from 'redux';
import { Card } from 'domain/entity/card';
import * as actions from 'actions/cardList';
import { uuid } from 'uuidv4';

type Action = ReturnType<typeof actions.addCard | typeof actions.removeCard>

export type State = Card[];

const initialState: State = [{
  id: '0',
  text: 'text',
  color: 'white',
  label: {
    作成者: 'hashimoto'
  },
  position: {
    x: 0,
    y: 0,
    z: 0
  }
}];

const cardListReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch(action.type) {
    case actions.ADD_CARD:
      return [...state, {
        id: uuid(),
        text: '',
        color: 'red',
        label: {
          作成者: ''
        },
        position: {
          x: 0,
          y: 0,
          z: 0
        }
      }];
    case actions.REMOVE_CARD:
      return state.filter(card => card.id !== action.payload.id);
    default:
      return state;
  }
}

export default cardListReducer;