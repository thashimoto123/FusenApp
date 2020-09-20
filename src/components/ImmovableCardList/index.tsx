import React from 'react';
import CardList, { CardListProps, CardType } from 'components/CardList';

const ImmovableCardList: React.FC<CardListProps> = (props) => {
  const cardList = props.cardList.map((card: CardType) => {
    return {
      ...card,
      position: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  })
  return <CardList {...props} cardList={cardList} />
} 

export default ImmovableCardList