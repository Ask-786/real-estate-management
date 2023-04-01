import { PropertyModelInterface } from './../model/property.model';
import { createReducer, on } from '@ngrx/store';
import {
  PropertyStateInterface,
  selectedPropertyInterface,
} from './../model/propertyState.interface';
import * as PropertyActions from './actions';
import * as EnquiryActions from '../../enquiries/store/actions';

const initialSelectedProperty: selectedPropertyInterface = {
  property: null,
  isFavorite: false,
};
export const initialState: PropertyStateInterface = {
  properties: [],
  mostBottomReached: false,
  selectedProperty: initialSelectedProperty,
  page: 0,
  ownProperties: [],
  favoriteIds: [],
  favorites: [],
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
  on(PropertyActions.UpdatePropertySuccess, (state, action) => {
    let newProperties: PropertyModelInterface[];
    let newOwnProperties: PropertyModelInterface[];
    const allIndex = state.properties.findIndex(
      (el) => el._id === state.selectedProperty?.property?._id
    );
    const ownIndex = state.ownProperties.findIndex(
      (el) => el._id === state.selectedProperty?.property?._id
    );
    if (allIndex !== -1) {
      newProperties = [...state.properties];
      newProperties[allIndex] = action.newProperty;
    } else {
      newProperties = [...state.properties];
    }
    if (ownIndex !== -1) {
      newOwnProperties = [...state.ownProperties];
      newOwnProperties[ownIndex] = action.newProperty;
    } else {
      newOwnProperties = [...state.ownProperties];
    }

    return {
      ...state,
      properties: newProperties,
      ownProperties: newOwnProperties,
      selectedProperty: {
        ...state.selectedProperty,
        property: action.newProperty,
      },
    };
  }),
  on(PropertyActions.getOneProperty, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PropertyActions.getOnePropertySuccess, (state, action) => {
    if (state.favoriteIds.includes(action.property._id)) {
      return {
        ...state,
        selectedProperty: {
          isFavorite: true,
          property: action.property,
        },
      };
    } else {
      return {
        ...state,
        selectedProperty: {
          isFavorite: false,
          property: action.property,
        },
      };
    }
  }),
  on(PropertyActions.getOwnPropertiesSuccess, (state, action) => ({
    ...state,
    ownProperties: action.ownProperties,
  })),
  on(PropertyActions.deletePropertySuccess, (state) => {
    let newProperties: PropertyModelInterface[];
    let newOwnProperties: PropertyModelInterface[];
    const allIndex = state.properties.findIndex(
      (el) => el._id === state.selectedProperty?.property?._id
    );
    const ownIndex = state.ownProperties.findIndex(
      (el) => el._id === state.selectedProperty?.property?._id
    );
    if (allIndex !== -1) {
      newProperties = state.properties.filter(
        (el) => el._id !== state.selectedProperty?.property?._id
      );
    } else {
      newProperties = [...state.properties];
    }
    if (ownIndex !== -1) {
      newOwnProperties = state.ownProperties.filter(
        (el) => el._id !== state.selectedProperty?.property?._id
      );
    } else {
      newOwnProperties = [...state.ownProperties];
    }
    return {
      ...state,
      properties: newProperties,
      ownProperties: newOwnProperties,
    };
  }),
  on(PropertyActions.getFavoritesSuccess, (state, action) => ({
    ...state,
    favorites: action.favProperties,
  })),
  on(PropertyActions.getFavoriteIdsSuccess, (state, action) => ({
    ...state,
    favoriteIds: action.favoriteProperties,
  })),
  on(PropertyActions.favourPropertySuccess, (state, action) => ({
    ...state,
    selectedProperty: { ...state.selectedProperty, isFavorite: true },
    favoriteIds: [...state.favoriteIds, action.id],
  })),
  on(PropertyActions.unFavourPropertySuccess, (state, action) => ({
    ...state,
    selectedProperty: { ...state.selectedProperty, isFavorite: false },
    favoriteIds: state.favoriteIds.filter((el) => el !== action.id),
  })),
  on(PropertyActions.searchPropertiesSuccess, (state, action) => ({
    ...state,
    properties: action.searchResult,
  })),
  on(EnquiryActions.createEnquirySuccess, (state, action) => {
    const modifiedProperty = JSON.parse(
      JSON.stringify(state.selectedProperty.property)
    ) as PropertyModelInterface;
    if (modifiedProperty) {
      modifiedProperty.enquirers.push(action.createdEnquiry.sender);
    }
    return {
      ...state,
      selectedProperty: {
        ...state.selectedProperty,
        property: modifiedProperty,
      },
    };
  })
);
