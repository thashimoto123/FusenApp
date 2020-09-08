import { IColor } from 'core';

export const UPDATE_COLORS = 'UPDATE_COLORS';
export const updateColors = (payload: {colors: IColor[] }) => ({
  type: UPDATE_COLORS as typeof UPDATE_COLORS,
  payload
});