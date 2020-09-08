import {IBoard, Board} from '../entities/';

export interface InAddBoard {
  id?: IBoard['id'],
  cards?: IBoard['cards'],
  colors?: IBoard['colors'],
  labelNames?: IBoard['labelNames'],
  users?: IBoard['users']
}


export interface InEditBoard {
  id: IBoard['id'],
  cards?: IBoard['cards'],
  colors?: IBoard['colors'],
  labelNames?: IBoard['labelNames'],
  users?: IBoard['users']
}

export interface IBoardRepository {
  find(id: string): Promise<IBoard | undefined>;
  findAll(): Promise<IBoard[]>;
  save(boards: IBoard[]): void;
}

export interface IBoardsPresentation {
  setLoading(flag: boolean): void;
  viewBoard(board: IBoard): void;
  viewBoardAll(boards: IBoard[]): void;
  notFindBoard(): void;
  notFindBoardAll(): void;
}

export interface IBoardsUseCase {
  find: (id: string) => Promise<IBoard | undefined>;
  findAll: () => Promise<IBoard[]>;
  add: (board: InAddBoard) => Promise<undefined>;
  edit: (board: InEditBoard) => Promise<undefined>;
  delete: (id: string) => Promise<undefined>;
}

export class BoardsUseCase implements IBoardsUseCase {
  private repository: IBoardRepository;
  private presentation: IBoardsPresentation;

  constructor(repository: IBoardRepository, presentation: IBoardsPresentation) {
    this.repository = repository;
    this.presentation = presentation;
  }

  async find(id: string): Promise<IBoard | undefined> {
    this.presentation.setLoading(true);
    const found = await this.repository.find(id);
    if (found) {
      this.presentation.setLoading(false);
      this.presentation.viewBoard(found);
    } else {
      this.presentation.notFindBoard();
    }
    return found;
  }

  async findAll(): Promise<IBoard[]> {
    this.presentation.setLoading(true);
    const found = await this.repository.findAll();
    if (found) {
      this.presentation.setLoading(false);
      this.presentation.viewBoardAll(found);
    } else {
      this.presentation.notFindBoardAll();
    }
    return found;
  }

  async add(board: InAddBoard): Promise<undefined> {
    const boards = await this.repository.findAll();
    if (!boards) { return };
    const newBoards = [...boards, new Board(board)];
    this.repository.save(newBoards);
    this.presentation.viewBoardAll(newBoards);
  }

  async edit(board: InEditBoard): Promise<undefined> {
    const boards = await this.repository.findAll();
    if (!boards) return;
    const newBoards = [...boards.map(b => {
      if (b.id === board.id) {
        return Object.assign(b, board);
      };
      return b;
    })];
    this.repository.save(newBoards);
    this.presentation.viewBoardAll(newBoards);
  }

  async delete(id: string): Promise<undefined> {
    const boards = await this.repository.findAll();
    if (!boards) return;
    const newBoards = boards.filter(c => c.id !== id);
    this.repository.save(newBoards);
    this.presentation.viewBoardAll(newBoards);
  }

}