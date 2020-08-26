import React, {useCallback} from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import { ICard, IColor } from 'core/entities/card';
import { useCardsPresentation } from 'presentations/cards';
import { useCardsLocalStorageRepository } from 'repositories/cards';
import { CardsUseCase } from 'core/usecases/cards';

const cx = cn.bind(styles);

type Props = {
  card: ICard
}

const ContextMenuColorSelector: React.FC<Props> = ({ card }) => {
  const colors = useSelector((state) => state.colors);
  const cardsPresentation = useCardsPresentation({});
  const cardsRepository = useCardsLocalStorageRepository();
  const cardsUseCase = new CardsUseCase(cardsRepository, cardsPresentation);
  const handleClickColor = useCallback((color: IColor) => {
    cardsUseCase.edit({
      id: card.id,
      color
    })
  }, [card, cardsUseCase]);

  return (
    <ul className={cx('color-list')}>
      {
        colors.map(color => {
          const  isActive = color === card.color;
          return (
            <li 
              className={cx('color-item', {'is-active': isActive})} 
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