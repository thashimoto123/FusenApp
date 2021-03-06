import { v4 as uuidv4 } from 'uuid';
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

export const initialColors: IColor[] = ['white','rgb(246, 236, 191)','rgb(215, 231, 248)','rgb(246, 198, 228)'];

export const initialLabelNames: ILabelName[] = [
{
  id: uuidv4(),
  name: '作成者'
},
{
  id: uuidv4(),
  name: 'カテゴリー'
}
];

export type BoardProps = {
  id?: string;
  cards?: ICard[];
  colors?: IColor[];
  labelNames?: ILabelName[];
  users?: IUser[];
}
export class Board implements IBoard {
  id: string;
  cards: ICard[];
  colors: IColor[];
  labelNames: ILabelName[];
  users: IUser[];
  constructor(props?:BoardProps) {
    this.id = props?.id || uuidv4();
    this.cards = props?.cards || [];
    this.colors = props?.colors || initialColors;
    this.labelNames = props?.labelNames || initialLabelNames;
    this.users = props?.users || [];
  }
}