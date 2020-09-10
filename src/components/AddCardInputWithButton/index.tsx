import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import InputWithButton, { InputWithButtonProps } from 'components/InputWithButton';

export type AddCardInputWithButtonProps = {
  style?: React.CSSProperties;
}

const AddCardInputWithButton: React.FC<AddCardInputWithButtonProps> = (props) => {
  const labelNames = useSelector(state => state.labelNames);
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const repository = useCardsLocalStorageRepository();
  const presentation = useCardsPresentation({ setLoading });
  const cardsUseCase = new CardsUseCase(repository, presentation);

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
      style: props.style,
      handleSubmit,
      handleChange,
      buttonValue: '追加',
      disabled: loading,
      value: text,
    }
  }, [props, handleSubmit, handleChange, text, loading]);

  return <InputWithButton {...inputWithButtonProps}  />
}

export default AddCardInputWithButton