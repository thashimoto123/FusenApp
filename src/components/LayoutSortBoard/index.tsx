import React from 'react';
import { useSelector } from 'react-redux';
import Board, { SortFunc } from 'components/Board';
import ImmovableCardList from 'components/ImmovableCardList';

const LayoutSortBoard: React.FC = () => {
  const sort = useSelector(state => state.boards.sort);
  const sortFunc = sort === 'text' ? textSort : sort === 'color' ? colorSort : labelSortFactory(sort.replace('label:',''));
  return (
    <Board CardListComponent={ImmovableCardList} sortFunc={sortFunc} />
  )
}

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

const labelSortFactory = (labelId: string): SortFunc => {
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