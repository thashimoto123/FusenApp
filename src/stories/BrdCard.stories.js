import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Card from 'components/Card';
import 'index.css';

export default {
  title: 'Card',
  component: Card,
};


export const White = () => {
  const [text, setText] = useState('white');
  return <Card color={'white'} position={{x: 0, y: 0, z: 0}} text={text} handleChange={setText} />
}

export const ColorCode = () => {
  const [text, setText] = useState('#94D4a9');
  return <Card color={'#94D4a9'} position={{x: 0, y: 0, z: 0}} text={text} handleChange={setText} />
}

export const ShowLabel = () => {
  const [text, setText] = useState("{id: '1', name: 'ラベルネーム', value: 'ラベルバリュー'}");
  return <Card color={'rgb(246, 236, 191)'} position={{x: 0, y: 0, z: 0}} text={text} handleChange={setText} labels={[{id: '1', name: 'ラベルネーム', value: 'ラベルバリュー'}]} />
}
