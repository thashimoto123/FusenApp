import React from 'react';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import ContextMenuColorSelector from 'components/ContextMenuColorSelector';
import { ICard, ICardsUseCase } from 'core';

const cx = cn.bind(styles);

interface ContextMenuProps {
  card: ICard,
  position: {
    x: number,
    y: number
  },
  cardsUseCase: ICardsUseCase,
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>,
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  card,
  position,
  children,
  cardsUseCase,
  setIsShow
}) => {
  const style = {
    top: position.y + 'px',
    left: position.x + 'px'
  }
  return (
    <div className={cx('context-menu')} style={style}>
      <ul>
        <ContextMenuItem 
          HoverItem={ContextMenuColorSelector} 
          card={card} 
          Component={() => {
            return <><i>&#xf020;</i>カラーを選択</>
          }}
        />
        <ContextMenuItem 
          HoverItem={ContextMenuColorSelector}
          card={card}
          Component={() => {
            return <><i>&#xe801;</i>ラベルを設定</>
          }}
        />
          
        <hr />
        <ContextMenuItem 
          card={card}
          Component={() => {
            return <><i>&#xe83d;</i>削除</>
          }}
          onClick={ () => { 
            cardsUseCase.delete(card.id);
            setIsShow(false);
          }}
        />
      </ul>
    </div>
  )
}

interface ContextMenuItemProps {
  card: ICard,
  icon?:any,
  text?: string,
  Component?: React.FC<any>
  HoverItem?: any,
  onClick?: (...args:any[]) => void,
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  card,
  icon,
  text,
  Component,
  HoverItem,
  onClick = () => {}
}) => {
  return (
    <li className={cx('context-menu-item', {hover: HoverItem})} onClick={onClick}>
      { Component && <Component card={card} /> }
      { HoverItem && <div className={cx('context-submenu')}><HoverItem card={card} /></div> }
    </li>
  )
}

export default ContextMenu