import React from 'react';
import { ICard } from 'core';
import Card, { CardProps } from 'components/Card';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

export type CardType = {
  id: ICard['id'];
  text: ICard['text'];
  position: ICard['position'];
  color: ICard['color'];
  labels: {id: string, name: string, value: string}[];
}

export type HandleClickCardFactory = (card: CardType) => (ev: React.MouseEvent<HTMLDivElement>) => void;
export type HandleRightClickCardFactory = (card: CardType) => (ev: React.MouseEvent<HTMLDivElement>) => void;
export type HandleChangeTextFactory = (card: CardType) => (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type HandleDragCardFactory = (card: CardType) => (ev: React.MouseEvent<HTMLDivElement>) => void;
export type HandleMouseDownFactory = (card: CardType) => (ev: React.MouseEvent<HTMLDivElement>) => void;

export type CardListProps = {
  style?: React.CSSProperties;
  ItemComponent?: React.FC<CardProps>;
  cardList: CardType[];
  handleRightClickCardFactory?: HandleClickCardFactory;
  handleClickCardFactory?: HandleRightClickCardFactory;
  handleChangeTextFactory?: HandleChangeTextFactory;
  handleDragCardFactory?: HandleDragCardFactory;
  handleMouseDownFactory?: HandleMouseDownFactory;
}

const defaultEmptyFactory = () => {
  return () => {}
}

const CardList: React.FC<CardListProps> = ({
  ItemComponent = Card,
  cardList,
  handleClickCardFactory = defaultEmptyFactory,
  handleRightClickCardFactory = defaultEmptyFactory,
  handleChangeTextFactory = defaultEmptyFactory,
  handleDragCardFactory = defaultEmptyFactory,
  handleMouseDownFactory = defaultEmptyFactory,
}) => {
  return (
    <div className={cx('cardList')}>
      {
        cardList.map((card: CardType) => {
          const handleClick = handleClickCardFactory(card);
          const handleRightClick = handleRightClickCardFactory(card);
          const handleChange = handleChangeTextFactory(card);
          const handleDrag = handleDragCardFactory(card);
          const handleMouseDown = handleMouseDownFactory(card);

          return (
            <ItemComponent 
              key={card.id}
              id={card.id}
              text={card.text} 
              color={card.color} 
              labels={card.labels}
              position={card.position}
              handleClick={handleClick} 
              handleRightClick={handleRightClick}
              handleChange={handleChange}
              handleDrag={handleDrag}
              handleMouseDown={handleMouseDown}
            />
          )
        })
      }
    </div>
  )
}

export default CardList