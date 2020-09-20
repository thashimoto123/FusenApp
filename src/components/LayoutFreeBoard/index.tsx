import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CardsUseCase, ICardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import DroppableBoard from 'components/DroppableBoard';
import CustomDragLayer from 'components/CustomDragLayer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const LayoutFreeBoard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const cardsRepository = useCardsLocalStorageRepository();
  const cardsPresentation = useCardsPresentation({setLoading});
  const cardsUseCase = new CardsUseCase(cardsRepository, cardsPresentation);
  const initialCardsUseCase = useRef<ICardsUseCase>(new CardsUseCase(cardsRepository, cardsPresentation));

  useEffect(() => {
    initialCardsUseCase.current.findAll();
  }, [initialCardsUseCase]);

  const cardList = useSelector(state => state.cards).map(card => {
    return ({
      ...card,
      labels: card.labels.map(label => ({...label, name: ''}))
    })
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <DroppableBoard cardsUseCase={cardsUseCase} cardList={cardList} loading={loading} />
      <CustomDragLayer />
    </DndProvider>
  )
}

export default LayoutFreeBoard