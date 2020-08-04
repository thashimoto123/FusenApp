import React, { useState, useCallback, useEffect } from 'react';
import useSuggestion from 'hooks/useSuggestion';
import createKeydownHandler from 'createKeydownHandler';
import './style.scss';

const InputWithSuggestion:React.FC = () => {
  const [text, setText] = useState<string>('');
  const [words, setWords] = useState<string[]>(['apple', 'orange']);
  const { suggestions, activeIndex, setActiveIndex } = useSuggestion(text, words);

  const handleKeydownArrowUp = useCallback(createKeydownHandler({
    key: 'ArrowUp',
    control: false,
    handler: (ev) => {
      ev.preventDefault();
      const index = activeIndex - 1 >= 0 ? activeIndex -1 : -1; 
      setActiveIndex(index);
    }
  }), [suggestions, activeIndex, setActiveIndex]);

  const handleKeydownArrowDown = useCallback(createKeydownHandler({
    key: 'ArrowDown',
    control: false,
    handler: (ev) => {
      ev.preventDefault();
      const index = activeIndex + 1 < suggestions.length ? activeIndex + 1 : suggestions.length - 1; 
      setActiveIndex(index);
    }
  }), [suggestions, activeIndex, setActiveIndex]);

  const handleKeydownEnter = useCallback(createKeydownHandler({
    key: 'Enter',
    control: false,
    handler: (ev) => {
      if (activeIndex === -1) return true;
      ev.preventDefault();
      setText(suggestions[activeIndex]);
    }
  }), [suggestions, setText, text, activeIndex]);

  const handleKeydown = useCallback((ev:KeyboardEvent) => {
    handleKeydownArrowUp(ev);
    handleKeydownArrowDown(ev);
    handleKeydownEnter(ev);
  }, [handleKeydownArrowUp, handleKeydownArrowDown]);

  const props:SuugestionProps = {
    suggestions, 
    activeIndex, 
    handleKeydown, 
    selectSuggestion: setText 
  };

  return (
    <>
      <input type="text" value={text} onChange={(ev) => setText(ev.target.value)} />
      {
        suggestions.length > 0 && 
        <Suggestion {...props}
        />
      }
    </>
  )
}

interface SuugestionProps {
  suggestions: any[];
  activeIndex: number;
  handleKeydown: (ev:KeyboardEvent) => void;
  selectSuggestion: any;
  [key: string]: any;
}

const Suggestion: React.FC<SuugestionProps> = ({
  suggestions, 
  activeIndex, 
  handleKeydown,
  selectSuggestion
}) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => { window.removeEventListener('keydown', handleKeydown)};
  }, [handleKeydown]);

  return (
    <ul>
      {
        suggestions.map((suggestion, i) => {
          const isActive = i === activeIndex ? 'is-active' : '';
          return  (
            <li 
              key={suggestion} 
              className={isActive} 
              onClick={()=>{ selectSuggestion(suggestion) }}
            >
              {suggestion}
            </li>
          )
        })
      }
    </ul>
  )
}

export default InputWithSuggestion