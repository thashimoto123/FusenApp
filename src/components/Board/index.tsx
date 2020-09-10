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
  HandleMouseDownFactory
} from 'components/CardList';
import AddCardInputWithButton from 'components/AddCardInputWithButton';
import { useContextMenu } from './hooks';
import { CardsUseCase, ICardsUseCase } from 'core';
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
    contextMenuCardId,
    setContextMenuCardId
  } = useContextMenu(overlayRef);
  const cardsRepository = useCardsLocalStorageRepository();
  const cardsPresentation = useCardsPresentation({setLoading});
  const cardsUseCase = new CardsUseCase(cardsRepository, cardsPresentation);
  const initialCardsUseCase = useRef<ICardsUseCase>(new CardsUseCase(cardsRepository, cardsPresentation));

  const cards = useSelector(state => {
    return state.cards.map(card => {
      const labels = card.labels.map(label => {
        const lb = state.labelNames.find(l => l.id === label.id);
        const name = lb ? lb.name : '';
        return {
          ...label,
          name
        }
      })
      return {
        ...card,
        labels
      }
    })
  });

  useEffect(() => {
    initialCardsUseCase.current.findAll();
  }, [initialCardsUseCase]);

  // コンテキストメニューを表示する関数を作成する関数
  const handleRightClickCardFactory: HandleRightClickCardFactory = useCallback((card: ICard) => {
    return (ev: Event) => {
      ev.preventDefault();
      setContextMenuPosition({x: card.position.x + 300, y: card.position.y});
      setContextMenuView(true);
      setContextMenuCardId(card.id);
    }
  }, [setContextMenuPosition, setContextMenuView, setContextMenuCardId]);

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
  }, [cardsUseCase]);

  const handleMouseDownFactory: HandleMouseDownFactory = useCallback((card: ICard) => {
    return (ev: React.MouseEvent<HTMLDivElement>) => {
      setContextMenuView(false);
    }
  }, [setContextMenuView]);

  return (
    <div ref={boardRef} className={cx('board')}>
      <div ref={overlayRef} className={cx('overlay')}></div>
      { !loading && (
        <>
          <CardListComponent 
            style={{zIndex: 2}}
            cardList={cards}
            handleClickCardFactory={handleClickCardFactory}
            handleRightClickCardFactory={handleRightClickCardFactory}
            handleChangeTextFactory={handleChangeTextFactory}
            handleMouseDownFactory={handleMouseDownFactory}
          />

          <AddCardInputWithButton style={{
            position: 'absolute',
            bottom: '200px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
          }} />
        </>
      )}

      { (contextMenuView && contextMenuCardId) && 
        <ContextMenu position={contextMenuPosition} cardId={contextMenuCardId} cardsUseCase={cardsUseCase} setIsShow={setContextMenuView} />
      }
    </div>
  )

}

export default Board