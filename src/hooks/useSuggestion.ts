import { useMemo } from 'react';
import getWordsContainingString from '../getWordsContainingString';

const useSuggestion = (str: string, words: string[]) => {
  const suggestions = useMemo(() => {
    return getWordsContainingString(str, words);
  }, [str, words])
  return { suggestions };
}