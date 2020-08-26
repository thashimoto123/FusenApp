import { ICardRepository, ICard, IBoard } from 'core';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import  * as actions  from 'actions/cards';
import { StoreState } from 'store';

export const useCardsLocalStorageRepository = (): ICardRepository => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards);
  let board = useSelector(state => ({
    id: state.board.id,
    colors: state.colors,
    labelNames: state.labelNames,
    users: state.users,
    cards: cards
  }));

  const find: ICardRepository['find'] = async (id: string) => {
    return cards.find(card => card.id === id);
  }

  const findAll: ICardRepository['findAll'] = async () => {
    let boardsJSON: string | null = localStorage.getItem('boards');
    let cardsInStorage: ICard[] = cards;
    if (boardsJSON) {
      let boards = JSON.parse(boardsJSON);
      let b = boards.find((b:IBoard) => b.id === board.id);
      if (b) { cardsInStorage = b.cards }
    }
    return cardsInStorage;
  }

  const save: ICardRepository['save'] = async (cards: ICard[]) => {
    let boardsJSON: string | null = localStorage.getItem('boards');
    let boards: IBoard[] = boardsJSON ? JSON.parse(boardsJSON) : [];

    
    let index = boards.findIndex(b => b.id === board.id);
    board.cards = cards;
    if (index >= 0) {
      boards[index] = board
    } else {
      boards.push(board);
    }
    console.log(boards);
    localStorage.setItem('boards', JSON.stringify(boards));
  }

  return {
    find,
    findAll,
    save
  }

}
