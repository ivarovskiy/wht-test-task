import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ICat } from '../models/cat';
import { FetchCats, ToggleFavorite } from './cat.actions';

export interface CatStateModel {
  cats: ICat[];
  favoriteCats: string[];
}

@State<CatStateModel>({
  name: 'cats',
  defaults: { cats: [], favoriteCats: [] },
})
@Injectable()
export class CatState {
  @Selector()
  static sortedCats(state: CatStateModel) {
    const favoriteCatsMap = new Set(state.favoriteCats);

    const sortedCats = state.cats
      .slice()
      .map(cat => {
        const isFavorite = favoriteCatsMap.has(cat.id);
        return { ...cat, favorite: isFavorite };
      })
      .sort((a, b) => {
        const aIsFavorite = a.favorite;
        const bIsFavorite = b.favorite;

        if (aIsFavorite && !bIsFavorite) {
          return -1;
        } else if (!aIsFavorite && bIsFavorite) {
          return 1;
        }

        return 0;
      });

    return sortedCats;
  } // постоянно новые данные с АПИ идут, проверять на породе Aegean, так как их мало )))

  @Action(FetchCats)
  FetchCats(ctx: StateContext<CatStateModel>, action: FetchCats) {
    ctx.patchState({
      cats: action.cats,
    });
  }

  @Action(ToggleFavorite)
  toggleFavorite(ctx: StateContext<CatStateModel>, action: ToggleFavorite) {
    const state = ctx.getState();
    const updatedCats = state.cats.map(cat =>
      cat.id === action.cat.id ? { ...cat, favorite: !cat.favorite } : cat
    );

    let updatedFavoriteCats = state.favoriteCats.slice();

    if (action.cat.favorite) {
      updatedFavoriteCats = updatedFavoriteCats.filter(
        id => id !== action.cat.id
      );
    } else {
      updatedFavoriteCats.push(action.cat.id);
    }

    ctx.setState({
      ...state,
      cats: updatedCats,
      favoriteCats: updatedFavoriteCats,
    });
  }
}
