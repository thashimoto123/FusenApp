import {useState, useLayoutEffect, useCallback} from 'react';
import { ICard } from 'core/entities/card';

export const useContextMenu = (parentRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const [contextMenuCardId, setContextMenuCardId] = useState<ICard['id'] | null>(null);
  const [contextMenuView, setContextMenuView] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{x: number,y: number}>({x: 0, y: 0});
  const [focusCardId, setFocusCardId] = useState<string| null>(null);
  const hideContextMenu = useCallback(() => {
    setContextMenuView(false);
    setContextMenuCardId(null);
  },[setContextMenuView]);

  // ContextMenu非表示関数を登録
  const parent = parentRef.current;
  useLayoutEffect(() => {
    if (!parent) return;
    parent!.addEventListener('contextmenu', hideContextMenu);
    parent!.addEventListener('click', hideContextMenu);
    return () => {
      if (parent !== null) {

        parent!.removeEventListener('contextmenu', hideContextMenu);
        parent!.removeEventListener('click', hideContextMenu);
      }
    }
  }, [parent, hideContextMenu]);

  return {
    setContextMenuPosition,
    setContextMenuView,
    contextMenuPosition,
    contextMenuView,
    contextMenuCardId,
    setContextMenuCardId,
    focusCardId,
    setFocusCardId
  }
}
