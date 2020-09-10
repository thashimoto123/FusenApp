import React, { useState, useMemo, useCallback } from 'react';
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
  handleChange?: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void,
  handleClick?: (...args: any[]) => void,
  handleDoubleClick?: (...args: any[]) => void,
  handleRightClick?: (...args: any[]) => void,
  handleDrag?: (...args: any[]) => void,
  handleMouseDown?: (...args: any[]) => void,
}

const Card: React.FC<CardProps> = ({
  id = '',
  style = {},
  cardRef,
  text, 
  color,
  position,
  labels = [],
  handleClick = () => {},
  handleChange = () => {},
  handleRightClick = () => {},
  handleDrag = () => {},
  handleMouseDown = () => {}
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const classname = cx('card');
  const cardStyle = useMemo(() => {
    return {
      backgroundColor: color,
      top: position.y + 'px',
      left: position.x + 'px',
      zIndex: position.z,
      ...style
    }
  },[color, position, style]);


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
      style={cardStyle} 
      draggable="true"
      onDoubleClick={handleDoubleClick} 
      onContextMenu={handleRightClick} 
      onMouseDown={handleMouseDown} 
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
      {
        // renderLabel(labels)
      }
    </div>
  )
}

// function renderLabel(list: {id: string, name: string, value: string}[]) {
//   if (list.length === 0) return <></>;
//   return (
//     <ul>
//       {
//         list.map(label => {
//           if (!label.name) return <></>;
//           return (
//             <li key={label.name + '_' + label.value} className={cx('label')}>
//               <div className={cx("label-name")}>{label.name}</div>:
//               <div className={cx("label-value")}>{label.value}</div>
//             </li>
//           )
//         })
//       }
//     </ul>
//   )
// }

export default Card