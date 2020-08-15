import { Card } from 'entities/card';
import { Board } from 'entities/board';
import { Color } from 'entities/color';

export const addCard = (card:Card,  cardList: Board['cardList']): Board['cardList'] =>  {
  return [...cardList, card];
}

export const removeCard = (cardId: Card['id'], cardList: Board['cardList']): Board['cardList'] => {
  return cardList.filter((card: Card) => card.id !== cardId)
}

export type editCardProps = {
  id: Card['id'],
  text?: Card['text'],
  color?: Card['color'],
  label?: Card['label'],
  position?: Card['position']
}

export const editCard = (card: editCardProps, cardList: Board['cardList']): Board['cardList'] => {
  return cardList.map(c => {
    if (c.id === card.id) {
      return Object.assign(c, card);
    };
    return c;
  })
}

export default {
  addCard,
  removeCard,
  editCard
}