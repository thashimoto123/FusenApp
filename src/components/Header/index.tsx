import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import { LAYOUT_FREE, LAYOUT_SORT, LayoutType } from 'constants/index';
import * as actions from 'actions/boards';

const cx = cn.bind(styles);

const Header: React.FC = () => {
  const labelNames = useSelector(state => state.labelNames);
  const selectedLayout = useSelector(state => state.boards.layout);
  const selectedSort = useSelector(state => state.boards.sort);
  const dispatch = useDispatch();

  const handleClickRadio = (layout: LayoutType) => {
    updateLayout(layout)
  };
  const updateLayout = (layout: LayoutType) => { dispatch(actions.updateLayout({layout})) }

  const handleChangeSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const index = ev.target.selectedIndex;
    const value = ev.target.options[index]?.value;
    dispatch(actions.updateSort({sort: value}));
  }
  return (
    <header className={cx('header')}>
      <div className={cx('layout')}>
        <form>
          レイアウト：
          <label>
            <input type="radio" name="layout" defaultChecked={LAYOUT_FREE === selectedLayout} value={LAYOUT_FREE} onClick={() => { handleClickRadio(LAYOUT_FREE) }} /><div className={cx('radio')} />
            自由
          </label> 
          <label>
            <input type="radio" name="layout" defaultChecked={LAYOUT_SORT === selectedLayout} value={LAYOUT_SORT} onClick={() => { handleClickRadio(LAYOUT_SORT) }} /><div className={cx('radio')} />
            並べる
           </label>
        </form>
      </div>
      {
        selectedLayout === LAYOUT_SORT && (
          <div className={cx('sort')}>
            並べ替え：
            <select name="" onChange={handleChangeSelect}>
              <option value="text" selected={selectedSort === 'text'}>テキスト</option>
              <option value="color" selected={selectedSort === 'color'}>カラー</option>
              {
                labelNames.map((label) => {
                  return <option key={label.id} value={"label:"+label.id} selected={selectedSort === "label:"+label.id} >ラベル：{label.name}</option>
                })
              }
            </select>
          </div>
        )
      }
    </header>
  )
}

export default Header