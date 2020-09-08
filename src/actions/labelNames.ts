import { ILabelName } from 'core';

export const UPDATE_LABELNAMES = 'UPDATE_LABELNAMES';
export const updateLabelNames = (payload: {labelNames: ILabelName[] }) => ({
  type: UPDATE_LABELNAMES as typeof UPDATE_LABELNAMES,
  payload
});