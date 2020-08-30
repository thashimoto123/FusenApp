import React, { useState, useCallback } from 'react';
import { CardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

export type InputWithButtonProps = {
  style?: React.CSSProperties
}
const InputWithButton: React.FC<InputWithButtonProps> = ({
  style = {}
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const repository = useCardsLocalStorageRepository();
  const presentation = useCardsPresentation({ setLoading });
  const cardsUseCase = new CardsUseCase(repository, presentation);
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
    cardsUseCase.add({
      text,
      color: 'white'
    })
  }, [cardsUseCase, text]);
  const handleFocus = useCallback(() => {
    setIsFocus(true);
  },[setIsFocus]);
  const handleBlur = useCallback(() => {
    setIsFocus(false);
  }, [setIsFocus]);

  return (
    <form style={style} className={cx('input-wrap', {'focus': isFocus})} onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={text}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { setText(ev.target.value)}} 
      />
      <button type='submit'>追加</button>
    </form>
  )
}

export default InputWithButton