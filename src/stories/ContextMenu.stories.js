import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import ContextMenu, { ContextMenuItem  } from 'components/ContextMenu';
import { ContextMenuColorSelectorHumble } from 'components/ContextMenuColorSelector';
import { ContextMenuLabelEditorHumble } from 'components/ContextMenuLabelEditor';
import 'index.css';

export default {
  title: 'ContextMenu',
  component: ContextMenu,
}; 

export const Basic = () => {
  const [contextMenuView, setContextMenuView] = useState(true);
  const [focusCardId, setFocusCardId] = useState('');
  const [cardColor, setCardColor] = useState('rgb(246, 236, 191)');
  const card = {
    id: '1',
    color: 'white',
    labels: [{id: '1', value: ''}],
    text: '',
    position: {x: 0, y: 0, z: 0}
  };
  const props = {
    position: {x: 0, y: 0},
    cardId: '1',
    card,
    setCardId: '1',
    cardsUseCase: {
      find: (id) => new Promise(),
      findAll: () => new Promise(),
      add: (card) => new Promise(),
      edit: (card) => new Promise(),
      delete: (id) => new Promise()
    },
    setIsShow: setContextMenuView,
    setFocusCardId
  }
  return (
    <ContextMenu {...props}>
      <ContextMenuItem 
        HoverItem={() => (
          <ContextMenuColorSelectorHumble 
            cardColor={cardColor}
            handleClickColor={setCardColor}
            colors={['white','rgb(246, 236, 191)','rgb(215, 231, 248)','rgb(246, 198, 228)']}
          />
        )}
        cardsUseCase={props.cardsUseCase}
        card={props.card} 
        Component={() => {
          return <><i>&#xf020;</i>カラーを選択</>
        }}
      />
      <ContextMenuItem 
        HoverItem={(props) => (
          <ContextMenuLabelEditorHumble
            labels={props.card.labels}
            labelNames={[{id: '1', name: '作成者'}]}
            handleChangeLabel={()=>{}}
            isHover={props.isHover}
            cards={[card]}
            setIsHover={props.setIsHover}
          />
        )}
        cardsUseCase={props.cardsUseCase}
        card={props.card}
        Component={() => {
          return <><i>&#xe801;</i>ラベルを設定</>
        }}
      />
      <ContextMenuItem
        card={props.card}
        Component={() => {
          return <><i>&#xe807;</i>テキストを編集</>
        }}
      />
        
      <hr />
      <ContextMenuItem 
        card={props.card}
        Component={() => {
          return <><i>&#xe83d;</i>削除</>
        }}
      />
    </ContextMenu>
  )
}
