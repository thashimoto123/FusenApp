import React from 'react';
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

export default ContextMenuWithItems