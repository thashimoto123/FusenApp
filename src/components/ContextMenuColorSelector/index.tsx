import React, {useCallback, useMemo} from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import { ICard, IColor, ICardsUseCase } from 'core';
import { useCardsPresentation } from 'presentations/cards';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { CardsUseCase } from 'core/usecases/cards';

const cx = cn.bind(styles);

type Props = {
  card: ICard;
  isHover: boolean;
  setIsHover: React.Dispatch<boolean>;
  cardsUseCase: ICardsUseCase;
}

const ContextMenuColorSelector: React.FC<Props> = ({ card, cardsUseCase }) => {
  const colors = useSelector((state) => state.colors);
  const handleClickColor = useCallback((color: IColor) => {
    cardsUseCase.edit({
      id: card.id,
      color
    })
  }, [card, cardsUseCase]);
  

  return (
    <ContextMenuColorSelectorHumble 
      cardColor={card.color}
      colors={colors}
      handleClickColor={handleClickColor}
    />
  )
}

type HumbleProps = {
  colors: IColor[];
  handleClickColor: (color: IColor) => void;
  cardColor: IColor;
}

export const ContextMenuColorSelectorHumble: React.FC<HumbleProps> = ({
  colors,
  handleClickColor,
  cardColor
}) => {
  const listStyle = useMemo(() => {
    return {
      width: (colors.length * 40 + 10) + 'px'
    }
  }, [colors]);
  return (
    <ul className={cx('color-list')} style={listStyle}>
      {
        colors.map(color => {
          const isActive = color === cardColor;
          const border = color === 'white';
          return (
            <li 
              key={color}
              className={cx('color-item', {'is-active': isActive, border})} 
              style={{backgroundColor: color}} 
              onClick={() => {handleClickColor(color)}}
            ></li>
          )
        })
      }
    </ul>
  )
}

export default ContextMenuColorSelector