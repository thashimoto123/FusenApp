import { IBoardRepository, IBoard, Board, Card } from 'core';

export const useBoardsLocalStorageRepository = (): IBoardRepository => {
  const find: IBoardRepository['find'] = async (id: string) => {
    let boardsJSON: string | null = localStorage.getItem('boards');
    if (boardsJSON) {
      let boards = JSON.parse(boardsJSON);
      return boards.find((b:IBoard) => b.id === id);
    } else {
      return undefined
    }
  }

  const findAll: IBoardRepository['findAll'] = async () => {
    let boardsJSON: string | null = localStorage.getItem('boards');
    if (boardsJSON) {
      let boards = JSON.parse(boardsJSON);
      if (boards) {
        return boards
      }
    }
    return [initialBoard]
  }

  const save: IBoardRepository['save'] = async (boards: IBoard[]) => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }

  return {
    find,
    findAll,
    save
  }

}

const initialBoard = new Board({
  cards: [
    new Card({
      text: 'ダブルクリックでテキスト編集',
      position: { x: 0, y: 0, z: 1},
      color: 'rgb(215, 231, 248)'
    }),
    new Card({
      text: 'ドラッグでカードを移動',
      position: { x: 330, y: 0, z: 2},
      color: 'rgb(246, 198, 228)'
    }),
    new Card({
      text: '右クリックでメニューを表示',
      position: {
        x: 660, y: 0, z:0
      },
      color: 'rgb(246, 236, 191)'
    }),
  ]
});