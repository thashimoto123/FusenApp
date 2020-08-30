import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import { ICard } from 'core';
import ContextMenu from 'components/ContextMenu';
import  CardList, { 
  CardListProps,
  HandleClickCardFactory, 
  HandleRightClickCardFactory, 
  HandleChangeTextFactory,
  HandleDragCardFactory
} from 'components/CardList';
import InputWithButton from 'components/InputWithButton';
import { useContextMenu } from './hooks';
import { CardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import styles from './style.module.scss';

const cx = cn.bind(styles);

export type BoardProps = {
  boardRef?: any,
  CardListComponent?: React.FC<CardListProps>
}

const Board: React.FC<BoardProps> = ({
  boardRef = null,
  CardListComponent = CardList
}) => {
  // const cardList = useSelector(state => { return state.cardList; });
  const [loading, setLoading] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const {
    setContextMenuPosition,
    setContextMenuView,
    contextMenuPosition,
    contextMenuView,
    contextMenuCard,
    setContextMenuCard
  } = useContextMenu(overlayRef);
  const cardsRepository = useCardsLocalStorageRepository();
  const cardsPresentation = useCardsPresentation({setLoading});
  const cardsUseCase = new CardsUseCase(cardsRepository, cardsPresentation);
  const cards = useSelector(state => state.cards);

  useEffect(() => {
    cardsUseCase.findAll();
  }, []);

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
      cardsUseCase.edit({
        id: card.id,
        text: ev.target?.value ?? ''
      })
    }
  }, [cardsRepository, cardsPresentation, cardsUseCase]);

  const handleDragCardFactory: HandleDragCardFactory = useCallback((card: ICard) => {
    return (ev: React.MouseEvent<HTMLDivElement>) => {
      cardsUseCase.edit({
        id: card.id,
        position: {
          ...card.position,
          x: ev.pageX,
          y: ev.pageY
        }
      })
    }
  }, [cardsRepository, cardsPresentation, cardsUseCase]);

  return (
    <div ref={boardRef} className={cx('board')}>
      <div ref={overlayRef} className={cx('overlay')}></div>
      <CardListComponent 
        style={{zIndex: 2}}
        cardList={cards}
        handleClickCardFactory={handleClickCardFactory}
        handleRightClickCardFactory={handleRightClickCardFactory}
        handleChangeTextFactory={handleChangeTextFactory}
        handleDragCardFactory={handleDragCardFactory}
      />

      <InputWithButton style={{zIndex: 3}} />

      { (contextMenuView && contextMenuCard) && 
        <ContextMenu position={contextMenuPosition} card={contextMenuCard} cardsUseCase={cardsUseCase} setIsShow={setContextMenuView} />
      }
    </div>
  )

}

export default Board