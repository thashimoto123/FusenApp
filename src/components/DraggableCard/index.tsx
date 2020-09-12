import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Card, { CardProps } from 'components/Card';
import { ICard } from 'core';

export interface DropItem {
  id: ICard['id'];
  type: 'card';
  text: ICard['text'];
  position: ICard['position'];
  color: ICard['color'];
}
const DraggableCard: React.FC<CardProps> = (props) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { id: props.id, type: 'card',text: props.text, position: props.position, color: props.color, labels: props.labels },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

 useEffect(() => {
    preview(getEmptyImage())
  }, [preview]);

  if (isDragging) {
    return <div ref={drag} style={{opacity: 1}} />
  }
  return (
    <Card {...props} style={{position: 'absolute'}} cardRef={drag} />
  )
}


export default DraggableCard