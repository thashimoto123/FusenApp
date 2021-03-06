import React from 'react';
import store from 'store';
import ContextMenu, { ContextMenuProps, ContextMenuItem } from 'components/ContextMenu';
import ContextMenuColorSelector from 'components/ContextMenuColorSelector';
import ContextMenuLabelEditor from 'components/ContextMenuLabelEditor';

const ContextMenuWithItems: React.FC<ContextMenuProps> = (props) => {
  if (!props.card) { return <></> }
  return (
    <ContextMenu {...props}>
      <ContextMenuItem 
          HoverItem={ContextMenuColorSelector} 
          card={props.card} 
          cardsUseCase={props.cardsUseCase}
          Component={() => {
            return <><i>&#xf020;</i>カラーを選択</>
          }}
        />
        <ContextMenuItem 
          HoverItem={ContextMenuLabelEditor}
          card={props.card}
          cardsUseCase={props.cardsUseCase}
          Component={() => {
            return <><i>&#xe801;</i>ラベルを設定</>
          }}
        />
        <ContextMenuItem
          card={props.card}
          cardsUseCase={props.cardsUseCase}
          onClick={() => {
            props.setIsShow(false);
            props.setFocusCardId(props!.card!.id || '');
          }}
          Component={() => {
            return <><i>&#xe807;</i>テキストを編集</>
          }}
        />
        <ContextMenuItem
          card={props.card}
          cardsUseCase={props.cardsUseCase}
          onClick={() => {
            props.cardsUseCase.updateAll(toForeground(props!.card!.id));
            props.setIsShow(false);
            props.setCardId(null);
          }}
          Component={() => {
            return <><i>&#xf102;</i>最前面に移動</>
          }}
        />
          
        <hr />
        <ContextMenuItem 
          card={props.card}
          cardsUseCase={props.cardsUseCase}
          Component={() => {
            return <><i>&#xe83d;</i>削除</>
          }}
          onClick={ () => { 
            props.cardsUseCase.delete(props!.card!.id || '');
            props.setIsShow(false);
          }}
        />
    </ContextMenu>
  )
}

const toForeground = (cardId: string) => {
  const cards = store.getState().cards;
  const card = cards.find(c => c.id === cardId);
  if (!card) return cards;
  const zIndex = card.position.z;
  let max:number = 0;
  const newCards = cards.map(c => {
    max = max < c.position.z ? c.position.z : max;
    if (c.position.z > zIndex) c.position.z--;
    return c;
  });
  newCards.forEach(c => {
    if (c.id === cardId) c.position.z = max;
  })
  return newCards;
}

export default ContextMenuWithItems