import React from 'react';
import { ICard } from 'core';
import { ICardsPresentation } from 'core';
import { useDispatch } from 'react-redux';  
import  * as actions  from 'actions/cards';

type Option = {
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useCardsPresentation = (option: Option):ICardsPresentation => {
  const dispatch = useDispatch();
  const viewCardAll = (cards: ICard[]) => {
    dispatch(actions.updateCards({cards}));
  };
  const viewCard = () => {
  };
  const notFindCard = () => {};
  const notFindCardAll = () => {};
  const setLoading = option.setLoading ? option.setLoading :  () => {};

  return {
    setLoading,
    viewCard,
    viewCardAll,
    notFindCard,
    notFindCardAll
  }
}