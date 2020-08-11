import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import ContextMenu from 'components/ContextMenu';
import 'index.css';

export default {
  title: 'ContextMenu',
  component: ContextMenu,
}; 


export const Basic = () => {
  return <ContextMenu position={{x: 200, y: 200}} />
}
