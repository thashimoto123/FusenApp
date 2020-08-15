import {useState, useLayoutEffect, useCallback} from 'react';

export const useContextMenu = (parentRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const [contextMenuView, setContextMenuView] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{x: number,y: number}>({x: 0, y: 0});
  const hideContextMenu = useCallback(() => {
    setContextMenuView(false);
  },[setContextMenuView]);

  // ContextMenu非表示関数を登録
  useLayoutEffect(() => {
    parentRef.current!.addEventListener('contextmenu', hideContextMenu)
    parentRef.current!.addEventListener('click', hideContextMenu)
    return () => {
      if (parentRef !== null) {

        parentRef.current!.removeEventListener('contextmenu', hideContextMenu)
        parentRef.current!.removeEventListener('click', hideContextMenu)
      }
    }
  }, [parentRef, hideContextMenu]);

  return {
    setContextMenuPosition,
    setContextMenuView,
    contextMenuPosition,
    contextMenuView
  }
}
