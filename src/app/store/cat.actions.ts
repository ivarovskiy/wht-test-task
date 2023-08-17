import { ICat } from '../models/cat';

export class ToggleFavorite {
  static readonly type = '[Cat] Toggle Favorite';
  constructor(public cat: ICat) {}
}

export class FetchCats {
  static readonly type = '[Cat] Fetch and Set Cats';
  constructor(public cats: ICat[]) {}
}
