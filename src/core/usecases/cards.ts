import {ICard, Card} from '../entities/card';

export interface InAddCard {
  text?: ICard['text'];
  color?: ICard['color'];
  labels?: ICard['labels'];
  position?: ICard['position'];
}

export interface InEditCard {
  id: ICard['id'];
  text?: ICard['text'];
  color?: ICard['color'];
  labels?: ICard['labels'];
  position?: ICard['position'];
}

export interface ICardRepository {
  find(id: string): Promise<ICard | undefined>;
  findAll(): Promise<ICard[]>;
  save(cards: ICard[]): void;
}

export interface ICardsPresentation {
  setLoading(flag: boolean): void;
  viewCard(card: ICard): void;
  viewCardAll(cards: ICard[]): void;
  notFindCard(): void;
  notFindCardAll(): void;
}

export interface ICardsUseCase {
  find: (id: string) => Promise<ICard | undefined>;
  findAll: () => Promise<ICard[]>;
  add: (card: InAddCard) => Promise<undefined>;
  edit: (card: InEditCard) => Promise<undefined>;
  delete: (id: string) => Promise<undefined>;
}

export class CardsUseCase {
  private repository: ICardRepository;
  private presentation: ICardsPresentation;

  constructor(repository: ICardRepository, presentation: ICardsPresentation) {
    this.repository = repository;
    this.presentation = presentation;
  }

  async find(id: string): Promise<ICard | undefined> {
    this.presentation.setLoading(true);
    const find = await this.repository.find(id);
    if (find) {
      this.presentation.setLoading(false);
      this.presentation.viewCard(find);
    } else {
      this.presentation.notFindCard();
    }
    return find;
  }

  async findAll(): Promise<ICard[]> {
    this.presentation.setLoading(true);
    const find = await this.repository.findAll()
    if (find) {
      this.presentation.setLoading(false);
      this.presentation.viewCardAll(find);
    } else {
      this.presentation.notFindCardAll();
    }
    return find;
  }

  async add(card: InAddCard): Promise<undefined> {
    const cards = await this.repository.findAll();
    if (!cards) { return };
    const newCards = [...cards, new Card(card)];
    this.repository.save(newCards);
    this.presentation.viewCardAll(cards);
  }

  async edit(card: InEditCard): Promise<undefined> {
    const cards = await this.repository.findAll();
    if (!cards) return;
    const newCards = [...cards.map(c => {
      if (c.id === card.id) {
        return Object.assign(c, card);
      };
      return c;
    })];
    this.repository.save(newCards);
    this.presentation.viewCardAll(newCards);
  }

  async delete(id: string): Promise<undefined> {
    const cards = await this.repository.findAll();
    if (!cards) return;
    const newCards = cards.filter(c => c.id !== id);
    this.repository.save(newCards);
    this.presentation.viewCardAll(newCards);
  }

}