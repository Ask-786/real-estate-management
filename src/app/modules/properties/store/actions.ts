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
  '[Properties] Delete Property Success'
);
export const deletePropertyFailure = createAction(
  '[Properties] Delete Property Failure'
);
