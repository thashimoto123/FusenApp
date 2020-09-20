import React from 'react';
import Board, { BoardProps } from 'components/Board';
import { useDrop } from 'react-dnd';
import { DropItem } from 'components/DraggableCard';
import DraggableCardList from 'components/DraggableCardList';

const DroppableBoard: React.FC<BoardProps> = (props) => {
  const [, drop] = useDrop({
    accept: 'card',
    drop(item: DropItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number
        y: number
      }

      let x = Math.round(item.position.x + delta.x)
      let y = Math.round(item.position.y + delta.y)

      props.cardsUseCase.edit({
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

  return <Board {...props} boardRef={drop} CardListComponent={DraggableCardList} />
}

export default DroppableBoard