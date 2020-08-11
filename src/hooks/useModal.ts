import { useState } from 'react';
const modals: string[] = [];

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModalAfterCloseAll = () => {

  }
}

 // useState()
 //
 // 親要素でトリガーを登録 onclick = openModal('id')
 // モーダル要素でイベント