import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CardsUseCase, ICardsUseCase } from 'core';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { useCardsPresentation } from 'presentations/cards';
import Board from 'components/Board';
import { CardListWithLabelName } from 'components/CardList';
import ImmovableCardList from 'components/ImmovableCardList';

const LayoutSortBoard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const cardsRepository = useCardsLocalStorageRepository();
  const cardsPresentation = useCardsPresentation({setLoading});
  const cardsUseCase = new CardsUseCase(cardsRepository, cardsPresentation);
  const initialCardsUseCase = useRef<ICardsUseCase>(new CardsUseCase(cardsRepository, cardsPresentation));

  useEffect(() => {
    initialCardsUseCase.current.findAll();
  }, [initialCardsUseCase]);

  const cardList = useSelector(state => state.cards);
  const sort = useSelector(state => state.boards.sort);
  const labelNames = useSelector(state => state.labelNames);

  const sortType = /^label:.*/.test(sort) ? 'label' : sort;
  const labelId = sort.replace('label:','');
  const sortFunc = sort === 'text' ? textSort : sort === 'color' ? colorSort : labelSortFuncFactory(labelId);

  // ラベルネーム情報を追加したカードリスト
  const cards = cardList.map(card => {
    const labels = card.labels.map(label => {
      const lb = labelNames.find(l => l.id === label.id);
      const name = (sortType === 'label' && label.id === labelId) && lb ? lb.name : '';
      return {
        ...label,
        name
      }
    })
    return {
      ...card,
      labels
    }
  });

  const sortedCards = useMemo(() => {
    return sortFunc(cards)
  },[cards, sortFunc]);

  return (
    <Board CardListComponent={ImmovableCardList} cardList={sortedCards} loading={loading} cardsUseCase={cardsUseCase} />
  )
}

export type SortFunc = (cards: CardListWithLabelName) => CardListWithLabelName;

const textSort: SortFunc = (cards) => {
  const output = [...cards];
  output.sort((a, b) => {
    let A = a.text.toUpperCase();
    let B = b.text.toUpperCase();
    if (A < B) return -1
    if (A > B) return 1
    return 0
  })
  return output;
};

const colorSort: SortFunc = (cards) => {
  const output = [...cards];
  output.sort((a, b) => {
    let colorA = a.color;
    let colorB = b.color;
    if (colorA < colorB) return -1
    if (colorA > colorB) return 1
    return 0
  });
  return output;
}

const labelSortFuncFactory = (labelId: string): SortFunc => {
  return (cards) => {
    const output = [...cards];
    output.sort((a, b) => {
      let labelA = a.labels.find(label => label.id === labelId);
      let labelB = b.labels.find(label => label.id === labelId);
      if (!labelA || !labelB) return 0;
      if ((!labelB || !labelB.value) && (labelA && labelA.value)) return -1;
      if ((!labelA || !labelA.value) && (labelB && labelB.value)) return 1;
      if ((!labelA || !labelA.value)  && (!labelB || !labelB.value)) return 0;
      if (labelA.value < labelB.value) return -1;
      if (labelA.value > labelB.value) return 1;
      return 0;
    })
    return output;
  }
}

export default LayoutSortBoard