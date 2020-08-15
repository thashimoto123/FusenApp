import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import { Card as ICard } from 'entities/card';
import ContextMenu from 'components/ContextMenu';
import  CardList, { 
  HandleClickCardFactory, 
  HandleRightClickCardFactory, 
  HandleChangeTextFactory 
} from 'components/CardList';
import { useContextMenu } from './hooks';
import { useEditCard } from 'actions/cardList';
import styles from './style.module.scss';

const cx = cn.bind(styles);

const Board: React.FC = () => {
  const cardList = useSelector(state => { return state.cardList; });
  const boardRef = useRef<HTMLDivElement | null>(null);
  const {
    setContextMenuPosition,
    setContextMenuView,
    contextMenuPosition,
    contextMenuView
  } = useContextMenu(boardRef);
  const editCard = useEditCard();

  // コンテキストメニューを表示する関数を作成する関数
  const handleRightClickCardFactory: HandleRightClickCardFactory = useCallback((card: ICard) => {
    return (ev: Event) => {
      ev.preventDefault();
      setContextMenuPosition({x: card.position.x + 300, y: card.position.y});
      setContextMenuView(true);
    }
  }, [setContextMenuPosition, setContextMenuView]);

  // コンテキストメニューを非表示にする関数を作成する関数
  const handleClickCardFactory: HandleClickCardFactory = useCallback(() => {
    return (ev: Event) => {
      ev.preventDefault();
      setContextMenuView(false);
    }
  }, [setContextMenuView]);

  // カードのテキストを変更する関数を作成する関数
  const handleChangeTextFactory: HandleChangeTextFactory = useCallback((card: ICard) => {
    return (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      editCard({card: {
        id: card.id,
        text: ev.target?.value
      }})
    }
  }, []);

  return (
    <div className={cx('board')}>
      <div ref={boardRef} className={cx('overlay')}></div>
      <CardList 
        cardList={cardList}
        handleClickCardFactory={handleClickCardFactory}
        handleRightClickCardFactory={handleRightClickCardFactory}
        handleChangeTextFactory={handleChangeTextFactory}
      />

      { contextMenuView && <ContextMenu position={contextMenuPosition} />}
    </div>
  )

}

export default Board