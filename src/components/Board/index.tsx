import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';
import ContextMenu from 'components/ContextMenu';
import Card from 'components/Card';
import styles from './style.module.scss';
import { Card as ICard } from 'domain/entity/card';

const cx = cn.bind(styles);

const Board: React.FC = () => {
  const cardList = useSelector(state => {
    console.log(state);
    return state.cardList;
  });
  const [contextMenuView, setContextMenuView] = useState<boolean>(false);
  return (
    <div className={cx('board')}>
      {
        cardList.map((card: ICard) => {
          const handleRightClick = () => {
            setContextMenuView(true);
          }
          return <Card text={card.text} color={card.color} position={card.position} handleRightClick={handleRightClick} />
        })
      }
      
      { contextMenuView && <ContextMenu position={{x: 0, y: 0}} />}
    </div>
  )

}

export default Board