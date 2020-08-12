import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import ContextMenu from 'components/ContextMenu';
import Card from 'components/Card';
import styles from './style.module.scss';
import { Card as ICard } from 'domain/entity/card';

const cx = cn.bind(styles);

const Board: React.FC = () => {
  const cardList = useSelector(state => { return state.cardList; });
  const [contextMenuView, setContextMenuView] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{x: number,y: number}>({x: 0, y: 0});
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const hideContextMenu = useCallback(() => {
    setContextMenuView(false);
  },[setContextMenuView]);

  // ContextMenu非表示関数を登録
  useLayoutEffect(() => {
    boardRef.current!.addEventListener('contextmenu', hideContextMenu)
    boardRef.current!.addEventListener('click', hideContextMenu)
    return () => {
      if (boardRef !== null) {

        boardRef.current!.removeEventListener('contextmenu', hideContextMenu)
        boardRef.current!.removeEventListener('click', hideContextMenu)
      }
    }
  }, [boardRef, hideContextMenu]);


  return (
    <div className={cx('board')}>
      <div ref={boardRef} className={cx('overlay')}></div>
      {
        cardList.map((card: ICard) => {
          const handleRightClick = (ev: Event) => {
            ev.preventDefault();
            setContextMenuPosition({x: card.position.x + 300, y: card.position.y});
            setContextMenuView(true);
          }
          const handleClick = (ev: Event) => {
            ev.preventDefault();
            hideContextMenu();
          }
          return <Card text={card.text} color={card.color} handleClick={handleClick} position={card.position} handleRightClick={handleRightClick} />
        })
      }
      
      { contextMenuView && <ContextMenu position={contextMenuPosition} />}
    </div>
  )

}

export default Board