import React from 'react';
import { ICard, ILabel } from 'core';
import Card, { CardProps } from 'components/Card';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

interface LabelForView extends ILabel {
  name: string
}

export type CardListWithLabelName = CardWithLabelName[];

export type CardWithLabelName = {
  id: ICard['id'];
  text: ICard['text'];
  position: ICard['position'];
  color: ICard['color'];
  labels: LabelForView[];
  focus?: boolean;
  active?: boolean;
}

export type HandleClickCardFactory = (card: CardWithLabelName) => (ev: React.MouseEvent<HTMLDivElement>) => void;
export type HandleDoubleClickCardFactory = (card: CardWithLabelName) => (ev: React.MouseEvent<HTMLDivElement>) => void;
export type HandleRightClickCardFactory = (card: CardWithLabelName) => (ev: React.MouseEvent<HTMLDivElement>) => void;
export type HandleChangeTextFactory = (card: CardWithLabelName) => (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type HandleDragCardFactory = (card: CardWithLabelName) => (ev: React.MouseEvent<HTMLDivElement>) => void;
export type HandleMouseDownFactory = (card: CardWithLabelName) => (ev: React.MouseEvent<HTMLDivElement>) => void;
export type HandleBlurFactory = (card: CardWithLabelName) => (ev: React.FormEvent<HTMLInputElement>) => void;

export type CardListProps = {
  style?: React.CSSProperties;
  ItemComponent?: React.FC<CardProps>;
  cardList: CardListWithLabelName;
  handleRightClickCardFactory?: HandleRightClickCardFactory;
  handleClickCardFactory?: HandleClickCardFactory;
  handleDoubleClickCardFactory?: HandleDoubleClickCardFactory;
  handleChangeTextFactory?: HandleChangeTextFactory;
  handleDragCardFactory?: HandleDragCardFactory;
  handleMouseDownFactory?: HandleMouseDownFactory;
  handleBlurFactory?: HandleBlurFactory;
}

const defaultEmptyFactory = () => {
  return () => {}
}

const CardList: React.FC<CardListProps> = ({
  ItemComponent = Card,
  cardList,
  handleClickCardFactory = defaultEmptyFactory,
  handleRightClickCardFactory = defaultEmptyFactory,
  handleDoubleClickCardFactory = defaultEmptyFactory,
  handleChangeTextFactory = defaultEmptyFactory,
  handleDragCardFactory = defaultEmptyFactory,
  handleMouseDownFactory = defaultEmptyFactory,
  handleBlurFactory = defaultEmptyFactory,
  style = {}
}) => {
  return (
    <div className={cx('cardList')} style={style}>
      {
        cardList.map((card: CardWithLabelName) => {
          const handleClick = handleClickCardFactory(card);
          const handleRightClick = handleRightClickCardFactory(card);
          const handleDoubleClick = handleDoubleClickCardFactory(card);
          const handleChange = handleChangeTextFactory(card);
          const handleDrag = handleDragCardFactory(card);
          const handleMouseDown = handleMouseDownFactory(card);
          const handleBlur = handleBlurFactory(card);

          return (
            <ItemComponent 
              key={card.id}
              id={card.id}
              text={card.text} 
              color={card.color} 
              labels={card.labels}
              position={card.position}
              focus={!!card.focus}
              active={!!card.active}
              handleClick={handleClick} 
              handleRightClick={handleRightClick}
              handleDoubleClick={handleDoubleClick}
              handleChange={handleChange}
              handleDrag={handleDrag}
              handleMouseDown={handleMouseDown}
              handleBlur={handleBlur}
            />
          )
        })
      }
    </div>
  )
}

export default CardList