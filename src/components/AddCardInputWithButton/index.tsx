import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ICardsUseCase } from 'core';
import InputWithButton, { InputWithButtonProps } from 'components/InputWithButton';

export type AddCardInputWithButtonProps = {
  style?: React.CSSProperties;
  cardsUseCase: ICardsUseCase;
}

const AddCardInputWithButton: React.FC<AddCardInputWithButtonProps> = ({style = {}, cardsUseCase}) => {
  const labelNames = useSelector(state => state.labelNames);
  const [text, setText] = useState<string>('');

  const initialLabels = labelNames.map(labelName => ({
    id: labelName.id,
    value: ''
  }))


  const handleSubmit = useCallback((ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    cardsUseCase.add({
      text,
      color: 'white',
      labels: initialLabels
    });
    setText('');
  }, [cardsUseCase, text, initialLabels]);

  const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  }, [setText]);

  const inputWithButtonProps: InputWithButtonProps = useMemo(() => {
    return {
      style,
      onSubmit: handleSubmit,
      onChange: handleChange,
      buttonValue: 'カードを追加',
      value: text,
    }
  }, [style, handleSubmit, handleChange, text]);

  return <InputWithButton {...inputWithButtonProps}  />
}

export default AddCardInputWithButton
