import React, { useState, useCallback } from 'react';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

export type InputWithButtonProps = {
  style?: React.CSSProperties;
  onSubmit?: (ev: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  buttonValue?: string;
  placeholder?: string;
}

const InputWithButton: React.FC<InputWithButtonProps> = ({
  style = {},
  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {},
  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {},
  disabled = false,
  value = '',
  buttonValue = '送信',
  placeholder = ''
}) => {

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleFocus = useCallback(() => {
    setIsFocus(true);
  },[setIsFocus]);
  const handleBlur = useCallback(() => {
    setIsFocus(false);
  }, [setIsFocus]);

  return (
    <form style={style} className={cx('input-wrap', {'focus': isFocus})} onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      />
      <button type='submit' disabled={disabled}>{buttonValue}</button>
    </form>
  )
}

export default InputWithButton
