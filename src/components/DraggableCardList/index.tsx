import React from 'react';
import CardList, { CardListProps } from 'components/CardList';
import DraggableCard from 'components/DraggableCard';

const DraggableCardList: React.FC<CardListProps> = (props) => {
  return <CardList ItemComponent={DraggableCard} {...props} />
} 

export default DraggableCardList