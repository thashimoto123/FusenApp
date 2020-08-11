import React from 'react';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import useColorList from 'hooks/useColorList';

const cx = cn.bind(styles);

const ContextMenuColorSelector: React.FC = () => {
  const {colorList} = useColorList();

  return (
    <ul className={cx('color-list')}>
      {
        colorList.map(color => {
          return <li className={cx('color-item')} style={{backgroundColor: color}}></li>
        })
      }
    </ul>
  )
}

export default ContextMenuColorSelector