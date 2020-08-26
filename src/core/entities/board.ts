import {uuid} from 'uuidv4';
import {ICard, IColor} from './card';
import {IUser} from './user';

export interface IBoard {
  id: string,
  cards: ICard[],
  colors: IColor[],
  labelNames: ILabelName[],
  users: IUser[]
}

export interface ILabelName {
  id: string,
  name: string
}

export const initialColors: IColor[] = ['rgb(246, 236, 191)','rgb(215, 231, 248)','rgb(246, 198, 228)'];
export const initialLabelNames: ILabelName[] = [{
  id: uuid(),
  name: '作成者'
}]
export type BoardProps = {
  id?: string;
  cards?: ICard[];
  colors?: IColor[];
  labelNames?: ILabelName[];
  users: IUser[];
}
export class Board implements IBoard {
  id: string;
  cards: ICard[];
  colors: IColor[];
  labelNames: ILabelName[];
  users: IUser[];
  constructor({
    id = uuid(),
    cards = [],
    colors = initialColors,
    labelNames = initialLabelNames,
    users = []
  }:BoardProps) {
    this.id = id;
    this.cards = cards;
    this.colors = colors;
    this.labelNames = labelNames;
    this.users = users;
  }
}