import React, { useState } from 'react';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import { ICard, ICardsUseCase } from 'core';

const cx = cn.bind(styles);

export interface ContextMenuProps {
  cardId: ICard['id'];
  card: ICard | undefined;
  position: {
    x: number,
    y: number
  };
  style?: React.CSSProperties;
  cardsUseCase: ICardsUseCase;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCardId: React.Dispatch<React.SetStateAction<string | null>>;
  setFocusCardId: React.Dispatch<React.SetStateAction<string | null>>;
  children?: JSX.Element[] | JSX.Element
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  card,
  cardId,
  position,
  children,
  cardsUseCase,
  setIsShow,
  setCardId,
  setFocusCardId,
  style = {},
}) => {
  

  if (!card) return (<></>);

  style.top = position.y + 'px';
  style.left = position.x + 'px';


  return (
    <div className={cx('context-menu')} style={style}>
      <ul>
        {
          children
        }
      </ul>
    </div>
  )
}

export interface ContextMenuItemProps {
  card: ICard,
  icon?:any,
  text?: string,
  Component?: React.FC<any>
  HoverItem?: any,
  onClick?: (...args:any[]) => void,
  cardsUseCase: ICardsUseCase
}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  card,
  icon,
  text,
  Component,
  HoverItem,
  cardsUseCase,
  onClick = () => {}
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <li className={cx('context-menu-item', {hover: HoverItem})} onClick={onClick}>
      { Component && <Component card={card} /> }
      { HoverItem && <div className={cx('context-submenu', {'is-hover': isHover})}><HoverItem cardsUseCase={cardsUseCase} card={card} isHover={isHover} setIsHover={setIsHover} /></div> }
    </li>
  )
}

export default ContextMenu