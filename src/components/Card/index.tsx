import React, { useState, useMemo, useCallback } from 'react';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

interface BrdCardProps {
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
}

const BrdCard: React.FC<BrdCardProps> = ({ 
  text, 
  color,
  position,
  handleClick = () => {},
  handleChange = () => {},
  handleRightClick = () => {} 
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
      className={classname} 
      style={style} 
      onDoubleClick={handleDoubleClick} 
      onContextMenu={handleRightClick} 
      onClick={handleClick}
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

export default BrdCard