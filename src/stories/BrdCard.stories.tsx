import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Card, { CardProps } from 'components/Card';
import 'index.css';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    color: {
      control: {
        type: 'color'
      }
    }
  },
  parameters: {
    backgrounds: {
      default: 'light',
    }
  }
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;
export const Default = Template.bind({});
Default.args = {
  color: 'white',
  position:{x: 0, y: 0, z: 0},
  text: 'color is white',
  handleChange: action('onChange')
}

export const Color = Template.bind({});
Color.args = {
  ...Default.args,
  text: 'Set color code #94D4a9',
  color: '#94D4a9',
}

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  text: 'It is possible to display a label',
  color: '#94D4a9',
  labels: [{id: '1', name: 'creator', value: 'thsmt'}]
}
