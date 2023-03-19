import {
  PropertyModelInterface,
  AddPropertyInterface,
} from './../model/property.model';
import { createAction, props } from '@ngrx/store';

export const getProperties = createAction('[Properties] Get Properties');
export const getPropertiesSuccess = createAction(
  '[Properties] Get Properties Success',
  props<{ properties: PropertyModelInterface[] }>()
);
export const getPropertiesFailure = createAction(
  '[Properties] Get Properties Failure',
  props<{ error: string }>()
);

export const addProperty = createAction(
  '[Properties] Add Property',
  props<{ propertyData: AddPropertyInterface; images: string[] }>()
);
export const addPropertySuccess = createAction(
  '[Properties] Add Property Success',
  props<{ property: PropertyModelInterface }>()
);
export const addPropertyFailure = createAction(
  '[Properties] Add Property Failure',
  props<{ error: string }>()
);

export const getOneProperty = createAction(
  '[Properties] Get One Property',
  props<{ propertyId: string }>()
);
export const getOnePropertySuccess = createAction(
  '[Properties] Get One Property Success',
  props<{ property: PropertyModelInterface }>()
);
export const getOnePropertyFailure = createAction(
  '[Properties] Get One Property Failure',
  props<{ error: string }>()
);

export const getOwnProperties = createAction('[Properties] Get Own Properties');
export const getOwnPropertiesSuccess = createAction(
  '[Properties] Get Own Properties Success',
  props<{ ownProperties: PropertyModelInterface[] }>()
);
export const getOwnPropertiesFailure = createAction(
  '[Properties] Get Own Properties Failure'
);

export const deleteProperty = createAction(
  '[Properties] Delete Property',
  props<{ id: string }>()
);
export const deletePropertySuccess = createAction(
  '[Favorites] Delete Property Success'
);
export const deletePropertyFailure = createAction(
  '[properties] Delete Property Failure'
);

export const favourProperty = createAction(
  '[Properties] Favour Property',
  props<{ id: string }>()
);
export const favourPropertySuccess = createAction(
  '[Properties] Favor Property Success',
  props<{ id: string }>()
);
export const favourPropertyFailure = createAction(
  '[Properties] Favor Property Failure'
);

export const unFavourProperty = createAction(
  '[Properties] Unfavour Property',
  props<{ id: string }>()
);
export const unFavourPropertySuccess = createAction(
  '[Properties] Unfavor Property Success',
  props<{ id: string }>()
);
export const unFavourPropertyFailure = createAction(
  '[Properties] Unfavor Property Failure'
);

export const getFavorites = createAction('[Favorites] Get Favorite Properties');
export const getFavoritesSuccess = createAction(
  '[Properties] Get Favorite Properties Success',
  props<{ favProperties: PropertyModelInterface[] }>()
);
export const getFavoritesFailure = createAction(
  '[Properties] Get Favorite Properties Failure'
);

export const getFavoriteIds = createAction('[Favorites] Get Favorite Ids');
export const getFavoriteIdsSuccess = createAction(
  '[Properties] Get Favorite Ids Success',
  props<{ user: string; favoriteProperties: string[] }>()
);
export const getFavoriteIdsFailure = createAction(
  '[Properties] Get Favorite Ids Failure'
);
