import React from 'react';
import Board from 'components/Board';
import { useDrop } from 'react-dnd';
import { CardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import { DropItem } from 'components/DraggableCard';
import DraggableCardList from 'components/DraggableCardList';

const DroppableBoard: React.FC = () => {
  const repository = useCardsLocalStorageRepository();
  const presentation = useCardsPresentation({});
  const cardsUseCase = new CardsUseCase(repository, presentation);
  const [, drop] = useDrop({
    accept: 'card',
    drop(item: DropItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number
        y: number
      }

      let x = Math.round(item.position.x + delta.x)
      let y = Math.round(item.position.y + delta.y)

      cardsUseCase.edit({
        id: item.id,
        position: {
          x,
          y,
          z: item.position.z
        }
      });

      return undefined
    },
  });

  return <Board boardRef={drop} CardListComponent={DraggableCardList} />
}

export default DroppableBoard