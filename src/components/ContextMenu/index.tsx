import React from 'react';
import cn from 'classnames/bind';
import styles from './style.module.scss';
import ContextMenuColorSelector from 'components/ContextMenuColorSelector';

const cx = cn.bind(styles);

interface ContextMenuProps {
  position: {
    x: number,
    y: number
  }
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  children
}) => {
  const style = {
    top: position.y + 'px',
    left: position.x + 'px'
  }
  return (
    <div className={cx('context-menu')} style={style}>
      <ul>
        <ContextMenuItem 
          HoverItem={ContextMenuColorSelector}>
          <i>&#xf020;</i>カラーを選択
        </ContextMenuItem>
        <ContextMenuItem 
          HoverItem={ContextMenuColorSelector}>
          <i>&#xe801;</i>ラベルを設定
        </ContextMenuItem>
        <hr />
        <ContextMenuItem><i>&#xe83d;</i>削除</ContextMenuItem>
      </ul>
    </div>
  )
}

interface ContextMenuItemProps {
  icon?:any,
  text?: string,
  HoverItem?: any,
  onClick?: (...args:any[]) => void,
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  icon,
  text,
  HoverItem,
  onClick = () => {},
  children
}) => {
  return (
    <li className={cx('context-menu-item', {hover: HoverItem})} onClick={onClick}>
      { children }
      { HoverItem && <div className={cx('context-submenu')}><HoverItem/></div> }
    </li>
  )
}

export default ContextMenu