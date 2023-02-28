import { createReducer, on } from '@ngrx/store';
import { PropertyStateInterface } from './../model/propertyState.interface';
import * as PropertyActions from './actions';
export const initialState: PropertyStateInterface = {
  isLoading: false,
  properties: [],
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(PropertyActions.getProperties, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PropertyActions.getPropertiesSuccess, (state, action) => ({
    ...state,
    isLoading: true,
    properties: action.properties,
  })),
  on(PropertyActions.getPropertiesFailure, (state, action) => ({
    ...state,
    isLoading: true,
    error: action.error,
  }))
);
