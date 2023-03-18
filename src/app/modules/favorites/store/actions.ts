import { PropertyModelInterface } from './../../properties/model/property.model';
import { createAction, props } from '@ngrx/store';

export const favourProperty = createAction(
  '[Favorites] Favour Property',
  props<{ id: string }>()
);
export const favourPropertySuccess = createAction(
  '[Favorites] Favorite Property Success'
);
export const favourPropertyFailure = createAction(
  '[Favorites] Favorite Property Failure'
);

export const getFavorites = createAction('[Favorites] Get Favorite Properties');
export const getFavoritesSuccess = createAction(
  '[Favorites] Get Favorite Properties Success',
  props<{ favProperties: PropertyModelInterface[] }>()
);
export const getFavoritesFailure = createAction(
  '[Favorites] Get Favorite Properties Failure'
);
