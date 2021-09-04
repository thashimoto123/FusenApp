import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import InputWithButton, { InputWithButtonProps} from 'components/InputWithButton';
import 'index.css';

export default {
  title: 'InputWithButton',
  component: InputWithButton,
  argTypes: {
    value: { control: { type: 'text' } },
    buttonValue: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
  }
} as Meta;

const Template: Story<InputWithButtonProps> = (args) => <InputWithButton {...args} />

export const Basic = Template.bind({});
Basic.args = {
  onSubmit: (e, ...args) => { e.preventDefault(); action('onSubmit')(e, ...args) },
  onChange: action('onChange')
}

export const WithValue = Template.bind({});
WithValue.args = {
  ...Basic.args,
  value: 'テキスト'
}

export const CustomButtonValue = Template.bind({});
CustomButtonValue.args = {
  ...Basic.args,
  buttonValue: 'カードを追加'
}

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...Basic.args,
  placeholder: 'テキストを入力'
};
