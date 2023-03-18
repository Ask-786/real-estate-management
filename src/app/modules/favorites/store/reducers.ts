import { createReducer, on } from '@ngrx/store';
import { FavoritesStateInterface } from '../model/favoritesState.interface';
import * as FavoritesActions from './actions';

const initialState: FavoritesStateInterface = {
  favorites: [],
  mostBottomReached: false,
};

export const reducers = createReducer(
  initialState,
  on(FavoritesActions.getFavoritesSuccess, (state, action) => ({
    ...state,
    favorites: action.favProperties,
  }))
);
