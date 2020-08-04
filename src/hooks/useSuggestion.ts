import { useMemo, useState } from 'react';
import getWordsContainingString from '../getWordsContainingString';

const useSuggestion = (str: string, words: string[]): {
  suggestions: any[],
  activeIndex: number,
  setActiveIndex: any
} => {
  const [activeIndex, setActiveIndex] = useState<number>(0); 
  const suggestions = useMemo(() => {
    return getWordsContainingString(str, words);
  }, [str, words]);
  return { suggestions, activeIndex, setActiveIndex };
}

export default useSuggestion