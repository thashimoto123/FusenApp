import React, { useState, useEffect, useMemo, useCallback } from 'react';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

export interface CardProps {
  id?: string,
  cardRef?: any,
  text: string,
  color: string,
  labels?: {
    id: string,
    name: string,
    value: string
  }[],
  position: {
    x: number,
    y: number,
    z: number
  },
  style?: React.CSSProperties,
  focus?: boolean,
  active?: boolean,
  handleChange?: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void,
  handleClick?: (...args: any[]) => void,
  handleDoubleClick?: (...args: any[]) => void,
  handleRightClick?: (...args: any[]) => void,
  handleDrag?: (...args: any[]) => void,
  handleMouseDown?: (...args: any[]) => void,
  handleBlur?: (...args: any[]) => void,
  handleFocus?: (...args: any[]) => void,
}

const Card: React.FC<CardProps> = ({
  id = '',
  style = {},
  cardRef,
  text, 
  color,
  position,
  labels = [],
  focus = false,
  active = false,
  handleClick = () => {},
  handleChange = () => {},
  handleRightClick = () => {},
  handleDoubleClick = () => {},
  handleDrag = () => {},
  handleMouseDown = () => {},
  handleBlur = () => {}
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(focus);
  const classname = cx('card', { focus, active});
  const cardStyle = useMemo(() => {
    return {
      backgroundColor: color,
      top: position.y + 'px',
      left: position.x + 'px',
      zIndex: position.z,
      ...style
    }
  },[color, position, style]);

  const hDragStart = (ev: React.MouseEvent<HTMLElement>) => {
    if (isFocus || focus) {
      ev.preventDefault();
    }
  }
  
  const hDoubleClick = useCallback((ev) => {
    setIsFocus(true);
    handleDoubleClick(ev);
  }, [setIsFocus, handleDoubleClick]);

  const hBlur = useCallback(() => {
    setIsFocus(false);
  }, [setIsFocus]);

  useEffect(() => {
    setIsFocus(focus);
  }, [focus, setIsFocus]);


  return (
    <div 
      id={id}
      ref={cardRef}
      className={classname} 
      style={cardStyle} 
      draggable="true"
      onDoubleClick={hDoubleClick} 
      onContextMenu={handleRightClick} 
      onMouseDown={handleMouseDown} 
      onClick={handleClick}
      onDragStart={hDragStart}
      onDrag={handleDrag}
      >
      {
        focus || isFocus ? 
          <textarea 
            className={cx('textarea')} 
            defaultValue={text} 
            autoFocus
            onChange={handleChange}
            onBlur={(ev) => {handleBlur(ev);hBlur();}} /> 
          :
          <pre className={cx('inner')}>{ text }</pre>
      }
      {
        renderLabel(labels)
      }
    </div>
  )
}

function renderLabel(list: {id: string, name: string, value: string}[]) {
  if (list.length === 0) return <></>;
  return (
    <ul>
      {
        list.map(label => {
          if (!label.name) return null;
          return (
            <li key={label.name + '_' + label.value} className={cx('label')}>
              <div className={cx("label-name")}>{label.name}</div>:
              <div className={cx("label-value")}>{label.value}</div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Card