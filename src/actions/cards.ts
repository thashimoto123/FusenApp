import { ICard} from 'core/entities/card';

export const UPDATE_CARDS = 'UPDATE_CARDS';
export const updateCards = (payload: {cards: ICard[] }) => ({
  type: UPDATE_CARDS as typeof UPDATE_CARDS,
  payload
});