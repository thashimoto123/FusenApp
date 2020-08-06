import { useMemo, useState, useCallback, useEffect } from 'react';
import getWordsContainingString from 'getWordsContainingString';
import createKeydownHandler from 'createKeydownHandler';

interface UseSuggestion {
  (
    str: string,
    list: any[],
    callbackSelectSuggestion: any,
    filter?: (str: string, list: any[]) => any[]
  ) : {
    suggestions: any[];
    index: number;
  };
}

export const useSuggestion: UseSuggestion = (
  str: string, 
  list: string[], 
  callbackSelectSuggestion,
  filter = getWordsContainingString
  ) => {
  const [index, setActiveIndex] = useState<number>(-1);

  const suggestions = useMemo(() => {
    return filter(str, list);
  }, [str, list]);

  const handleKeydownArrowUp = useCallback(createKeydownHandler({
    key: 'ArrowUp',
    control: false,
    handler: (ev) => {
      if (suggestions.length === 0) return;
      ev.preventDefault();
      const newIndex = index - 1 >= -1 ? index -1 : suggestions.length - 1; 
      setActiveIndex(newIndex);
    }
  }), [suggestions, index, setActiveIndex]);

  const handleKeydownArrowDown = useCallback(createKeydownHandler({
    key: 'ArrowDown',
    control: false,
    handler: (ev) => {
      if (suggestions.length === 0) return;
      ev.preventDefault();
      const newIndex = index + 1 < suggestions.length ? index + 1 : -1; 
      setActiveIndex(newIndex);
    }
  }), [suggestions, index, setActiveIndex]);

  const handleKeydownEnter = useCallback(createKeydownHandler({
    key: 'Enter',
    control: false,
    handler: (ev) => {
      if (index === -1 || suggestions.length === 0) return;
      ev.preventDefault();
      callbackSelectSuggestion(suggestions[index]);
    }
  }), [suggestions, callbackSelectSuggestion, index]);

  const handleKeydown = useCallback((ev:  KeyboardEvent) => {
    handleKeydownArrowUp(ev);
    handleKeydownArrowDown(ev);
    handleKeydownEnter(ev);
  }, [handleKeydownArrowUp, handleKeydownArrowDown, handleKeydownEnter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => { window.removeEventListener('keydown', handleKeydown)};
  }, [handleKeydown]);

  return { suggestions, index };
}

