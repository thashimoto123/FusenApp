import { useMemo, useState, useCallback, useEffect } from 'react';
import getWordsContainingString from 'utils/getWordsContainingString';
import createKeydownHandler from 'utils/createKeydownHandler';

interface UseSuggestion {
  (
    str: string,
    list: any[],
    callbackSelectSuggestion: any,
    filter?: (str: string, list: any[]) => any[]
  ) : {
    suggestions: any[];
    activeIndex: number;
  };
}

export const useSuggestion: UseSuggestion = (str, list, callbackSelectSuggestion, filter = getWordsContainingString) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const suggestions = useMemo(() => {
    return filter(str, list);
  }, [str, list, filter]);

  const handleKeydownArrowUp = useCallback(createKeydownHandler({
    key: 'ArrowUp',
    control: false,
    handler: (ev) => {
      if (suggestions.length === 0) return;
      ev.preventDefault();
      const newIndex = activeIndex - 1 >= -1 ? activeIndex -1 : suggestions.length - 1; 
      setActiveIndex(newIndex);
    }
  }), [suggestions, activeIndex, setActiveIndex]);

  const handleKeydownArrowDown = useCallback(createKeydownHandler({
    key: 'ArrowDown',
    control: false,
    handler: (ev) => {
      if (suggestions.length === 0) return;
      ev.preventDefault();
      const newIndex = activeIndex + 1 < suggestions.length ? activeIndex + 1 : -1; 
      setActiveIndex(newIndex);
    }
  }), [suggestions, activeIndex, setActiveIndex]);

  const handleKeydownEnter = useCallback(createKeydownHandler({
    key: 'Enter',
    control: false,
    handler: (ev) => {
      if (activeIndex === -1 || suggestions.length === 0) return;
      ev.preventDefault();
      callbackSelectSuggestion(suggestions[activeIndex]);
    }
  }), [suggestions, callbackSelectSuggestion, activeIndex]);

  const handleKeydown = useCallback((ev:  KeyboardEvent) => {
    handleKeydownArrowUp(ev);
    handleKeydownArrowDown(ev);
    handleKeydownEnter(ev);
  }, [handleKeydownArrowUp, handleKeydownArrowDown, handleKeydownEnter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => { window.removeEventListener('keydown', handleKeydown)};
  }, [handleKeydown]);

  return { suggestions, activeIndex };
}

export default useSuggestion