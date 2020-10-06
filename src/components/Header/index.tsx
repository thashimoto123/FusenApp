import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ILabelName } from 'core';
import { LAYOUT_FREE, LAYOUT_SORT, LayoutType } from 'constants/index';
import * as actions from 'actions/boards';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

const Header: React.FC = () => {
  const headerHumbleProps = useHeader();
  return <HeaderHumble {...headerHumbleProps} />
}

type HeaderHumbleProps = {
  labelNames: ILabelName[];
  selectedLayout: LayoutType;
  selectedSort: string;
  updateLayout: any;
  updateSort: any;
}

const HeaderHumble: React.FC<HeaderHumbleProps> = ({
  labelNames,
  selectedLayout,
  selectedSort,
  updateLayout,
  updateSort
}) => {
  const handleClickRadio = (layout: LayoutType) => {
    updateLayout(layout)
  };

  const handleChangeSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const index = ev.target.selectedIndex;
    const value = ev.target.options[index]?.value;
    updateSort(value);
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
            <select name="" onChange={handleChangeSelect} defaultValue={selectedSort}>
              <option value="text">テキスト</option>
              <option value="color">カラー</option>
              {
                labelNames.map((label) => {
                  return <option key={label.id} value={"label:"+label.id} >ラベル：{label.name}</option>
                })
              }
            </select>
          </div>
        )
      }
    </header>
  )
}

const useHeader = (): {
  labelNames: ILabelName[];
  selectedLayout: LayoutType;
  selectedSort: string;
  updateLayout: any;
  updateSort: any;
} => {
  const labelNames = useSelector(state => state.labelNames);
  const selectedLayout = useSelector(state => state.boards.layout);
  const selectedSort = useSelector(state => state.boards.sort);
  const dispatch = useDispatch();
  const updateLayout = (layout: LayoutType) => { dispatch(actions.updateLayout({layout})); };
  const updateSort = (value: string) => {  dispatch(actions.updateSort({sort: value})); };

  return {
    labelNames,
    selectedLayout,
    selectedSort,
    updateLayout,
    updateSort
  }
};

export default Header;