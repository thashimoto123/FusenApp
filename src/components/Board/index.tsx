import React, { useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import { ICard, ICardsUseCase } from 'core';
import ContextMenuWithItems from 'components/ContextMenuWithItems';
import  CardList, { 
  CardListProps,
  HandleClickCardFactory, 
  HandleDoubleClickCardFactory, 
  HandleRightClickCardFactory, 
  HandleChangeTextFactory,
  HandleMouseDownFactory,
  HandleBlurFactory,
  CardListWithLabelName
} from 'components/CardList';
import AddCardInputWithButton from 'components/AddCardInputWithButton';
import { useContextMenu } from './hooks';
import styles from './style.module.scss';

const cx = cn.bind(styles);

export type BoardProps = {
  boardRef?: any;
  CardListComponent?: React.FC<CardListProps>;
  cardsUseCase: ICardsUseCase;
  cardList?: CardListWithLabelName
  loading?: boolean;
}

const Board: React.FC<BoardProps> = ({
  boardRef = null,
  CardListComponent = CardList,
  cardsUseCase,
  cardList = [],
  loading = false
}) => {
  
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const {
    setContextMenuPosition,
    setContextMenuView,
    contextMenuPosition,
    contextMenuView,
    contextMenuCardId,
    setContextMenuCardId,
    setFocusCardId,
    focusCardId
  } = useContextMenu(overlayRef);
  const card: ICard | undefined = useSelector(state => state.cards.find(c => c.id === contextMenuCardId));

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

  // コンテキストメニューを非表示にする関数を作成する関数
  const handleDoubleClickCardFactory: HandleDoubleClickCardFactory = useCallback((card: ICard) => {
    return (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.preventDefault();
      setContextMenuCardId(card.id);
    }
  }, [setContextMenuCardId]);

  // カードのテキストを変更する関数を作成する関数
  const handleChangeTextFactory: HandleChangeTextFactory = useCallback((card: ICard) => {
    return (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      cardsUseCase.edit({
        id: card.id,
        text: ev.target?.value ?? ''
      })
    }
  }, [cardsUseCase]);

  // カードのフォーカスが外れた時にステートの値を初期値に設定する関数
  const handleBlurFactory: HandleBlurFactory = useCallback((card: ICard) => {
    return (ev: React.FormEvent<HTMLInputElement>) => {
      setFocusCardId(null);
      setContextMenuCardId(null);
    }
  }, [setFocusCardId,setContextMenuCardId]);


  const handleMouseDownFactory: HandleMouseDownFactory = useCallback((card: ICard) => {
    return (ev: React.MouseEvent<HTMLDivElement>) => {
      setContextMenuView(false);
    }
  }, [setContextMenuView]);

  const cardListWithAddedStatus = addCardStatus(cardList, contextMenuCardId, focusCardId);

  const contextMenuProps = {
    card,
    position: contextMenuPosition,
    cardId: contextMenuCardId || '',
    setCardId: setContextMenuCardId,
    cardsUseCase,
    setIsShow: setContextMenuView,
    setFocusCardId
  }

  return (
    <div ref={boardRef} className={cx('board')}>
      <div ref={overlayRef} className={cx('overlay')}></div>
      { !loading && (
        <>
          <AddCardInputWithButton 
            style={{
              position: 'relative',
              marginBottom: '30px',
              zIndex: 3,
            }}
            cardsUseCase={cardsUseCase} 
          />

          <CardListComponent 
            style={{zIndex: 2}}
            cardList={cardListWithAddedStatus}
            handleClickCardFactory={handleClickCardFactory}
            handleRightClickCardFactory={handleRightClickCardFactory}
            handleDoubleClickCardFactory={handleDoubleClickCardFactory}
            handleChangeTextFactory={handleChangeTextFactory}
            handleMouseDownFactory={handleMouseDownFactory}
            handleBlurFactory={handleBlurFactory}
          />

        </>
      )}

      { (contextMenuView && contextMenuCardId) && 
        <ContextMenuWithItems {...contextMenuProps} style={{zIndex: 3}} />
      }
    </div>
  )
}

const addCardStatus = (cardList: CardListWithLabelName, contextMenuCardId: string | null, focusCardId: string | null): CardListWithLabelName => {
  return cardList.map(card => {
    card.active = card.id === contextMenuCardId;
    card.active = card.id === focusCardId;
    return card;
  })
}

export default Board