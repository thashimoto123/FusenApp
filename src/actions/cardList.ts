import { useDispatch } from 'react-redux';
import { editCardProps } from 'usecases/cardList';

export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const EDIT_CARD = 'EDIT_CARD';

export const addCard = () => ({
  type: ADD_CARD as typeof ADD_CARD
}) ;

export const removeCard = (payload: { id: string}) => ({
  type: REMOVE_CARD as typeof REMOVE_CARD,
  payload
});

export const editCard = (payload: { card: editCardProps }) => ({
  type: EDIT_CARD as typeof EDIT_CARD,
  payload
});

export const useAddCard = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(addCard())
  }
}

export const useEditCard = () => {
  const dispatch = useDispatch();
  return (payload: { card: editCardProps }) => {
    dispatch(editCard(payload));
  }
}