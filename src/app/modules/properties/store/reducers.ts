import { PropertyModelInterface } from './../model/property.model';
import { createReducer, on } from '@ngrx/store';
import { PropertyStateInterface } from './../model/propertyState.interface';
import * as PropertyActions from './actions';
export const initialState: PropertyStateInterface = {
  properties: [],
  mostBottomReached: false,
  selectedProperty: null,
  page: 0,
  ownProperties: [],
};

export const reducers = createReducer(
  initialState,
  on(PropertyActions.getPropertiesSuccess, (state, action) => {
    if (action.properties.length < 8) {
      return {
        ...state,
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
    ownProperties: [...state.ownProperties, action.property],
  })),
  on(PropertyActions.getOneProperty, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PropertyActions.getOnePropertySuccess, (state, action) => ({
    ...state,
    selectedProperty: action.property,
  })),
  on(PropertyActions.getOwnPropertiesSuccess, (state, action) => ({
    ...state,
    ownProperties: action.ownProperties,
  })),
  on(PropertyActions.deletePropertySuccess, (state) => {
    let newProperties: PropertyModelInterface[];
    let newOwnProperties: PropertyModelInterface[];
    const allIndex = state.properties.findIndex(
      (el) => el._id === state.selectedProperty?._id
    );
    const ownIndex = state.ownProperties.findIndex(
      (el) => el._id === state.selectedProperty?._id
    );
    if (allIndex !== -1) {
      newProperties = state.properties.filter(
        (el) => el._id !== state.selectedProperty?._id
      );
    } else {
      newProperties = [...state.properties];
    }
    if (ownIndex !== -1) {
      newOwnProperties = state.ownProperties.filter(
        (el) => el._id !== state.selectedProperty?._id
      );
    } else {
      newOwnProperties = [...state.ownProperties];
    }
    return {
      ...state,
      properties: newProperties,
      ownProperties: newOwnProperties,
    };
  })
);
