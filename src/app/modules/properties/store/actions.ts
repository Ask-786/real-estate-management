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
