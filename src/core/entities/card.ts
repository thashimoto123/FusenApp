import { v4 as uuidv4 } from 'uuid';
import { initialColors, initialLabelNames } from './board';

export interface ILabel {
  id: string,
  value: string
}

export interface ICard {
  id: string,
  text: string,
  color: IColor,
  labels: ILabel[],
  position: {
    x: number,
    y: number,
    z: number
  }
}

export type IColor = string;
type CardProps = {
  id?: string;
  text?: string;
  color?: string;
  labels?: ILabel[];
  position?: ICard['position'];
}
export class Card implements ICard {
  id: ICard['id'];
  text: ICard['text'];
  color: ICard['color'];
  labels: ICard['labels'];
  position: ICard['position'];
  constructor({
    id = uuidv4(),
    text = '',
    color = initialColors[0],
    labels = [{
      id: initialLabelNames[0].id,
      value: ''
    }],
    position = {x: 0, y: 0, z: 0}
  }:CardProps) {
    this.id = id;
    this.text = text;
    this.color = color;
    this.labels = labels;
    this.position = position;
  }
}