import { createReducer, on } from '@ngrx/store';
import { PropertyStateInterface } from './../model/propertyState.interface';
import * as PropertyActions from './actions';
export const initialState: PropertyStateInterface = {
  isLoading: false,
  properties: [],
  error: null,
  selectedProperty: null,
  mostBottomReached: false,
  page: 0,
};

export const reducers = createReducer(
  initialState,
  on(PropertyActions.getProperties, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PropertyActions.getPropertiesSuccess, (state, action) => {
    if (action.properties.length < 8) {
      return {
        ...state,
        isLoading: false,
        page: state.page + 1,
        properties: [...state.properties, ...action.properties],
        mostBottomReached: true,
      };
    }
    return {
      ...state,
      isLoading: false,
      page: state.page + 1,
      properties: [...state.properties, ...action.properties],
    };
  }),
  on(PropertyActions.getPropertiesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PropertyActions.addProperty, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PropertyActions.addPropertySuccess, (state, action) => ({
    ...state,
    isLoading: false,
    properties: [...state.properties, action.property],
  })),
  on(PropertyActions.addPropertyFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PropertyActions.getOneProperty, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PropertyActions.getOnePropertySuccess, (state, action) => ({
    ...state,
    isLoading: false,
    selectedProperty: action.property,
  })),
  on(PropertyActions.getOnePropertyFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
