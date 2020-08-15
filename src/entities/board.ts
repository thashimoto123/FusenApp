import { Card } from './card';
import { Color } from './color';
import { LabelName } from './label';
import { User} from './user';

export type Board = {
  id: string,
  cardList: Card[],
  colorList: Color[],
  labelNameList: LabelName[],
  userList: User[]
}