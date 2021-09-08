import React, { useState, useCallback, useRef } from 'react';
import SuggestionList from 'components/SuggestionList';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

const InputWithSuggestion:React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  const words = ['オレンジ','オレオ','おれんち','オンザムーン','orange','oreo', 'on the moon'];
  const [text, setText] = useState<string>('');
  const [isFoucs, setIsFocus]= useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const callbackSelectSuggestion = useCallback((text: string) => {
    setText(text);
    setIsFocus(false);
    inputRef?.current?.blur();
  }, [setText, setIsFocus, inputRef]);

  return (
    <div className={cx('input-wrap')} style={style}>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(ev) => setText(ev.target.value)}
        onFocus={() => {setIsFocus(true)}}
        onBlur={() => {setIsFocus(false)}}
        onCompositionUpdate={(ev) => {ev.preventDefault()}}
      />
      {
        isFoucs && <SuggestionList text={text} words={words} callbackSelectSuggestion={callbackSelectSuggestion} />
      }
    </div>
  )
}



export default InputWithSuggestion
