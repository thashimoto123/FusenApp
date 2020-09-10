import { IBoardRepository, IBoard, Board } from 'core';

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
    return [new Board()]
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
