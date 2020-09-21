import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import ContextMenuColorSelector from 'components/ContextMenuColorSelector';
import ContextMenuLabelEditor from 'components/ContextMenuLabelEditor';
import { ICard, ICardsUseCase } from 'core';

const cx = cn.bind(styles);

interface ContextMenuProps {
  cardId: ICard['id'];
  position: {
    x: number,
    y: number
  };
  cardsUseCase: ICardsUseCase;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCardId: React.Dispatch<React.SetStateAction<string | null>>;
  setFocusCardId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  cardId,
  position,
  children,
  cardsUseCase,
  setIsShow,
  setCardId,
  setFocusCardId,
}) => {
  const card: ICard | undefined = useSelector(state => state.cards.find(c => c.id === cardId));

  if (!card) return (<></>);

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
          HoverItem={ContextMenuLabelEditor}
          card={card}
          Component={() => {
            return <><i>&#xe801;</i>ラベルを設定</>
          }}
        />
        <ContextMenuItem
          card={card}
          onClick={() => {
            setIsShow(false);
            setFocusCardId(card.id);
          }}
          Component={() => {
            return <><i>&#xe807;</i>テキストを編集</>
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
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <li className={cx('context-menu-item', {hover: HoverItem})} onClick={onClick}>
      { Component && <Component card={card} /> }
      { HoverItem && <div className={cx('context-submenu', {'is-hover': isHover})}><HoverItem card={card} isHover={isHover} setIsHover={setIsHover} /></div> }
    </li>
  )
}

export default ContextMenu