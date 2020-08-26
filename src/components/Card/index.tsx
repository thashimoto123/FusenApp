import React, { useState, useMemo, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import cn from 'classnames/bind';
import styles from './style.module.scss';

const cx = cn.bind(styles);

interface BrdCardProps {
  id?: string,
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

const Card: React.FC<BrdCardProps> = ({
  id = '',
  text, 
  color,
  position,
  handleClick = () => {},
  handleChange = () => {},
  handleRightClick = () => {},
  handleDrag= () => {}
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag({
    item: { id, type: 'card', position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
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

  if (isDragging) {
    return <div ref={drag} style={{opacity: 1}} />
  }

  return (
    <div 
      ref={drag}
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