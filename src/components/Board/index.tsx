import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import { ICard } from 'core';
import ContextMenu from 'components/ContextMenu';
import  CardList, { 
  HandleClickCardFactory, 
  HandleRightClickCardFactory, 
  HandleChangeTextFactory 
} from 'components/CardList';
import { useContextMenu } from './hooks';
import { CardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import styles from './style.module.scss';

const cx = cn.bind(styles);

const Board: React.FC = () => {
  // const cardList = useSelector(state => { return state.cardList; });
  const [loading, setLoading] = useState<boolean>(false);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const {
    setContextMenuPosition,
    setContextMenuView,
    contextMenuPosition,
    contextMenuView,
    contextMenuCard,
    setContextMenuCard
  } = useContextMenu(boardRef);
  const cardsRepository = useCardsLocalStorageRepository();
  const cardsPresentation = useCardsPresentation({setLoading});
  const cardsUseCase = new CardsUseCase(cardsRepository, cardsPresentation);
  const cards = useSelector(state => state.cards);
  const editCard = cardsUseCase.edit;

  // コンテキストメニューを表示する関数を作成する関数
  const handleRightClickCardFactory: HandleRightClickCardFactory = useCallback((card: ICard) => {
    return (ev: Event) => {
      ev.preventDefault();
      setContextMenuPosition({x: card.position.x + 300, y: card.position.y});
      setContextMenuView(true);
      setContextMenuCard(card);
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
      editCard({
        id: card.id,
        text: ev.target?.value ?? ''
      })
    }
  }, []);

  return (
    <div className={cx('board')}>
      <div ref={boardRef} className={cx('overlay')}></div>
      <CardList 
        cardList={cards}
        handleClickCardFactory={handleClickCardFactory}
        handleRightClickCardFactory={handleRightClickCardFactory}
        handleChangeTextFactory={handleChangeTextFactory}
      />

      { (contextMenuView && contextMenuCard) && 
        <ContextMenu position={contextMenuPosition} card={contextMenuCard} cardsUseCase={cardsUseCase} setIsShow={setContextMenuView} />
      }
    </div>
  )

}

export default Board