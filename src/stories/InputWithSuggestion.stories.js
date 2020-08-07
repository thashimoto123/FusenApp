import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import InputWithSuggestion from 'components/InputWithSuggestion';
import 'index.css';

export default {
  title: 'InputWithSuggestion',
  component: InputWithSuggestion,
};


export const Basic = () => {
  return <InputWithSuggestion />
}
