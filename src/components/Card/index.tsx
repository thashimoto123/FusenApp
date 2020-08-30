import React, { useState, useMemo, useCallback, useEffect } from 'react';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

export interface CardProps {
  id?: string,
  cardRef?: any,
  text: string,
  color: string,
  position: {
    x: number,
    y: number,
    z: number
  },
  handleChange?: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void,
  handleClick?: (...args: any[]) => void,
  handleDoubleClick?: (...args: any[]) => void,
  handleRightClick?: (...args: any[]) => void,
  handleDrag?: (...args: any[]) => void,
}

const Card: React.FC<CardProps> = ({
  id = '',
  cardRef,
  text, 
  color,
  position,
  handleClick = () => {},
  handleChange = () => {},
  handleRightClick = () => {},
  handleDrag= () => {}
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  
  const classname = cx('card');
  const style = useMemo(() => {
    return {
      backgroundColor: color,
      top: position.y + 'px',
      left: position.x + 'px',
      zIndex: position.z
    }
  },[color, position]);


  const handleDoubleClick = useCallback(() => {
    setIsFocus(true);
  }, [setIsFocus]);

  const handleBlur = useCallback(() => {
    setIsFocus(false);
  }, [setIsFocus]);


  return (
    <div 
      ref={cardRef}
      className={classname} 
      style={style} 
      draggable="true"
      onDoubleClick={handleDoubleClick} 
      onContextMenu={handleRightClick} 
      onClick={handleClick}
      onDrag={handleDrag}
      >
      {
        isFocus ? 
          <textarea 
            className={cx('textarea')} 
            defaultValue={text} 
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur} /> 
          :
          <pre className={cx('inner')}>{ text }</pre>
      }
    </div>
  )
}

export default Card