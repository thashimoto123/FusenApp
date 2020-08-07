import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import BrdCard from 'components/BrdCard';
import 'index.css';

export default {
  title: 'BrdCard',
  component: BrdCard,
};


export const White = () => {
  const [text, setText] = useState('white');
  return <BrdCard color={'white'} position={{x: 0, y: 0, z: 0}} text={text} handleChange={setText} />
}

export const ColorCode = () => {
  const [text, setText] = useState('#94D4a9');
  return <BrdCard color={'#94D4a9'} position={{x: 0, y: 0, z: 0}} text={text} handleChange={setText} />
}
