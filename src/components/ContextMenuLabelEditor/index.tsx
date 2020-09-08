import React, {useCallback, useState, useRef, useMemo} from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import { ICard, ILabelName, ILabel } from 'core';
import { useCardsPresentation } from 'presentations/cards';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { CardsUseCase } from 'core/usecases/cards';
import SuggestionList from 'components/SuggestionList';

const cx = cn.bind(styles);

type Props = {
  card: ICard,
  isHover: boolean,
  setIsHover: React.Dispatch<boolean>
}

const ContextMenuLabelEditor: React.FC<Props> = ({ card, setIsHover, isHover }) => {
  const labelNames = useSelector(state => state.labelNames);
  const cardsPresentation = useCardsPresentation({});
  const cardsRepository = useCardsLocalStorageRepository();
  const cardsUseCase = new CardsUseCase(cardsRepository, cardsPresentation);
  const handleChangeLabel = useCallback((ev: React.FocusEvent<HTMLInputElement>, labelId) => {
    const index: number | undefined = card.labels.findIndex(label => label.id === labelId);
    if (index !== undefined) {
      const newLabels: ICard['labels'] = [...card.labels];
      newLabels[index].value = ev.target.value;
      cardsUseCase.edit({
        id: card.id,
        labels: newLabels
      });
    }
  }, [card, cardsUseCase, labelNames]);
  console.log(labelNames)

  return (
    <ul className={cx('label-list')}>
      {
        card.labels.map(label => {
          const labelName:ILabelName | undefined  = labelNames.find(l => l.id === label.id);

          // if (!labelName) { return <></>}

          return (
            <li 
              key={label.id}
              className={cx('label-item')}
            >
              <LabelItem label={label} labelName={labelName?.name || ''} isHover={isHover} setIsHover={setIsHover} handleChangeLabel={handleChangeLabel} />
            </li>
          )
        })
      }
    </ul>
  )
}

type LabelItemProps = {
  isHover: boolean;
  setIsHover: React.Dispatch<boolean>;
  label: ILabel;
  labelName: string;
  handleChangeLabel: (ev: React.FocusEvent<HTMLInputElement>, labelId: string) => void;
}

const LabelItem: React.FC<LabelItemProps> = ({label, labelName, handleChangeLabel, isHover, setIsHover}) => {
  const [labelValue, setLabelValue] = useState<string>(label.value);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const callbackSelectSuggestion = useCallback((text: string) => {
    setLabelValue(text);
    setIsFocus(false);
    inputRef?.current?.blur();
  }, [setLabelValue, setIsFocus, inputRef]);

  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    handleChangeLabel(ev, label.id);
    setIsFocus(false);
    setIsHover(false);
  }

  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
    setIsHover(true);
  }

  const words = useSelector(state => {
    return state.cards.map((card: ICard) => {
        return card?.labels?.find(l => l.id === label.id)?.value || '';
    })
  });

  // 重複削除
  const organizedWordsList = useMemo(() => {
    return Array.from(new Set(words));
  }, [words]);

  return (
    <label className={cx('label-wrap')}>
      <div className={cx('label-name')}>{labelName}</div>
      <input type="text" value={labelValue} onFocus={handleFocus} onBlur={handleBlur} onChange={(ev) => setLabelValue(ev.target.value)} />
      {
        isFocus && <SuggestionList text={labelValue} words={organizedWordsList} callbackSelectSuggestion={callbackSelectSuggestion} />
      }
    </label>
  )
}


export default ContextMenuLabelEditor