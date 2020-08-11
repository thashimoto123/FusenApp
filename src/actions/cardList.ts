export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

export const addCard = () => ({
  type: ADD_CARD as typeof ADD_CARD
}) 

export const removeCard = (payload: { id: string}) => ({
  type: REMOVE_CARD as typeof REMOVE_CARD,
  payload
})