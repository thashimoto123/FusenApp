import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import InputWithButton from 'components/InputWithButton';
import 'index.css';

export default {
  title: 'InputWithButton',
  component: InputWithButton,
};

const handleSubmit=(e) => {e.preventDefault()};

export const Basic = () => {
  return <InputWithButton handleSubmit={handleSubmit} />
}

export const WithValue = () => {
  return <InputWithButton value={'テキスト'} handleSubmit={handleSubmit} />
}

export const CustomButtonValue = () => {
  return <InputWithButton buttonValue={'カードを追加'} handleSubmit={handleSubmit} />
}

export const WithPlaceholder = () => {
  return <InputWithButton placeholder={'テキストを入力'} handleSubmit={handleSubmit} />
}

export const CanBeChanged = () => {
  const [text, setText] = useState('');
  return <InputWithButton value={text} handleChange={(e) => {setText(e.target.value);}} placeholder={'テキストを入力'} handleSubmit={handleSubmit} />
}
