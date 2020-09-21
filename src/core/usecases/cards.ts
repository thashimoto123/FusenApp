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
  updateAll: (cards: ICard[]) => Promise<undefined>;
  delete: (id: string) => Promise<undefined>;
}

export class CardsUseCase implements ICardsUseCase {
  private repository: ICardRepository;
  private presentation: ICardsPresentation;

  constructor(repository: ICardRepository, presentation: ICardsPresentation) {
    this.repository = repository;
    this.presentation = presentation;
  }

  async find(id: string): Promise<ICard | undefined> {
    this.presentation.setLoading(true);
    const found = await this.repository.find(id);
    if (found) {
      this.presentation.setLoading(false);
      this.presentation.viewCard(found);
    } else {
      this.presentation.notFindCard();
    }
    return found;
  }

  async findAll(): Promise<ICard[]> {
    this.presentation.setLoading(true);
    const found = await this.repository.findAll();
    if (found) {
      this.presentation.setLoading(false);
      this.presentation.viewCardAll(found);
    } else {
      this.presentation.notFindCardAll();
    }
    return found;
  }

  async add(card: InAddCard): Promise<undefined> {
    const cards = await this.repository.findAll();
    if (!cards) { return };
    let maxZIndex:number = 0;
    cards.forEach(c => {
      if (maxZIndex < c.position.z) maxZIndex = c.position.z;
    });
    const c = new Card(card);
    c.position.z = maxZIndex + 1;
    const newCards = [...cards, c];
    this.repository.save(newCards);
    this.presentation.viewCardAll(newCards);
  }

  async updateAll(cards: ICard[]): Promise<undefined>{
    this.repository.save(cards);
    this.presentation.viewCardAll(cards);
    return;
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