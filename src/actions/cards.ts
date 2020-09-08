import { ICard } from 'core';

export const UPDATE_CARDS = 'UPDATE_CARDS';
export const updateCards = (payload: {cards: ICard[] }) => ({
  type: UPDATE_CARDS as typeof UPDATE_CARDS,
  payload
});