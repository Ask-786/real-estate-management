import { createReducer, on } from '@ngrx/store';
import { PropertyStateInterface } from './../model/propertyState.interface';
import * as PropertyActions from './actions';
export const initialState: PropertyStateInterface = {
  properties: [],
  mostBottomReached: false,
  selectedProperty: null,
  page: 0,
};

export const reducers = createReducer(
  initialState,
  on(PropertyActions.getPropertiesSuccess, (state, action) => {
    if (action.properties.length < 8) {
      return {
        ...state,
        page: state.page + 1,
        properties: [...state.properties, ...action.properties],
        mostBottomReached: true,
      };
    }
    return {
      ...state,
      page: state.page + 1,
      properties: [...state.properties, ...action.properties],
    };
  }),
  on(PropertyActions.getPropertiesFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(PropertyActions.addPropertySuccess, (state, action) => ({
    ...state,
    properties: [...state.properties, action.property],
  })),
  on(PropertyActions.getOneProperty, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PropertyActions.getOnePropertySuccess, (state, action) => ({
    ...state,
    selectedProperty: action.property,
  }))
);
