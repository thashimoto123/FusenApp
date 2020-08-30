import React, { useState, useCallback, useMemo } from 'react';
import { CardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import InputWithButton, { InputWithButtonProps } from 'components/InputWithButton';

export type AddCardInputWithButtonProps = {
  style?: React.CSSProperties;
}

const AddCardInputWithButton: React.FC<AddCardInputWithButtonProps> = (props) => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const repository = useCardsLocalStorageRepository();
  const presentation = useCardsPresentation({ setLoading });
  const cardsUseCase = new CardsUseCase(repository, presentation);

  const handleSubmit = useCallback((ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    cardsUseCase.add({
      text,
      color: 'white'
    });
    setText('');
  }, [cardsUseCase, text]);

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
  }, [props, handleSubmit, loading]);

  return <InputWithButton {...inputWithButtonProps}  />
}

export default AddCardInputWithButton