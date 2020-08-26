import React from 'react';
import { ICard } from 'core';
import Card from 'components/Card';

export type HandleClickCardFactory = (card: ICard) => (ev: Event) => void;
export type HandleRightClickCardFactory = (card: ICard) => (ev: Event) => void;
export type HandleChangeTextFactory = (card: ICard) => (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;

export type CardListProps = {
  cardList: ICard[];
  handleRightClickCardFactory: HandleClickCardFactory;
  handleClickCardFactory: HandleRightClickCardFactory;
  handleChangeTextFactory: HandleChangeTextFactory;
}

const CardList: React.FC<CardListProps> = ({
  cardList,
  handleClickCardFactory,
  handleRightClickCardFactory,
  handleChangeTextFactory
}) => {
  return (
    <div>
      {
        cardList.map((card: ICard) => {
          const handleClick = handleClickCardFactory(card);
          const handleRightClick = handleRightClickCardFactory(card);
          const handleChange = handleChangeTextFactory(card);

          return (
            <Card 
              text={card.text} 
              color={card.color} 
              position={card.position}
              handleClick={handleClick} 
              handleRightClick={handleRightClick}
              handleChange={handleChange}
            />
          )
        })
      }
    </div>
  )
}

export default CardList