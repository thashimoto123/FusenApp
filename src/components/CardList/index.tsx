import React from 'react';
import { ICard } from 'core';
import Card from 'components/Card';

export type HandleClickCardFactory = (card: ICard) => (ev: Event) => void;
export type HandleRightClickCardFactory = (card: ICard) => (ev: Event) => void;
export type HandleChangeTextFactory = (card: ICard) => (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type HandleDragCardFactory = (card: ICard) => (ev: React.MouseEvent<HTMLDivElement>) => void;

export type CardListProps = {
  cardList: ICard[];
  handleRightClickCardFactory: HandleClickCardFactory;
  handleClickCardFactory: HandleRightClickCardFactory;
  handleChangeTextFactory: HandleChangeTextFactory;
  handleDragCardFactory: HandleDragCardFactory;
}

const CardList: React.FC<CardListProps> = ({
  cardList,
  handleClickCardFactory,
  handleRightClickCardFactory,
  handleChangeTextFactory,
  handleDragCardFactory,
}) => {
  return (
    <div>
      {
        cardList.map((card: ICard) => {
          const handleClick = handleClickCardFactory(card);
          const handleRightClick = handleRightClickCardFactory(card);
          const handleChange = handleChangeTextFactory(card);
          const handleDrag = handleDragCardFactory(card);

          return (
            <Card 
              key={card.id}
              id={card.id}
              text={card.text} 
              color={card.color} 
              position={card.position}
              handleClick={handleClick} 
              handleRightClick={handleRightClick}
              handleChange={handleChange}
              handleDrag={handleDrag}
            />
          )
        })
      }
    </div>
  )
}

export default CardList