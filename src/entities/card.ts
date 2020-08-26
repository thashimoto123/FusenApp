import { Color } from './color';
import { LabelName } from './label';

export type Label = {
  id: string,
  value: string
}

export type Card = {
  id: string,
  text: string,
  color: Color,
  labels: Label[],
  position: {
    x: number,
    y: number,
    z: number
  }
}