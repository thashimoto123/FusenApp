import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import { ICard } from 'core';
import ContextMenu from 'components/ContextMenu';
import  CardList, { 
  CardListProps,
  HandleClickCardFactory, 
  HandleRightClickCardFactory, 
  HandleChangeTextFactory,
  HandleMouseDownFactory,
  CardType
} from 'components/CardList';
import AddCardInputWithButton from 'components/AddCardInputWithButton';
import { useContextMenu } from './hooks';
import { CardsUseCase, ICardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import styles from './style.module.scss';

const cx = cn.bind(styles);

export type SortFunc = (cards: CardType[]) => CardType[];

export type BoardProps = {
  boardRef?: any,
  CardListComponent?: React.FC<CardListProps>
  sortFunc?: SortFunc
}

const Board: React.FC<BoardProps> = ({
  boardRef = null,
  CardListComponent = CardList,
  sortFunc = (cards) => cards
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

  useEffect(() => {
    initialCardsUseCase.current.findAll();
  }, [initialCardsUseCase]);

  // ラベルネーム情報を追加したカードリスト
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

  const sortedCards = useMemo(() => {
    return sortFunc(cards)
  },[cards, sortFunc]);


  // コンテキストメニューを表示する関数を作成する関数
  const handleRightClickCardFactory: HandleRightClickCardFactory = useCallback((card: ICard) => {
    return (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.preventDefault();
      const node = ev.currentTarget as HTMLElement;
      const rect = node.getBoundingClientRect();
      const width = node.offsetWidth;
      let left:number = rect.left + width;
      if (window.innerWidth < rect.left + width + 280) {
        left = rect.left - 180;
      }
      setContextMenuPosition({x: left, y: rect.top});
      setContextMenuView(true);
      setContextMenuCardId(card.id);
    }
  }, [setContextMenuPosition, setContextMenuView, setContextMenuCardId]);

  // コンテキストメニューを非表示にする関数を作成する関数
  const handleClickCardFactory: HandleClickCardFactory = useCallback(() => {
    return (ev: React.MouseEvent<HTMLDivElement>) => {
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
            cardList={sortedCards}
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