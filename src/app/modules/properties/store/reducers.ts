import { PropertyModelInterface } from './../model/property.model';
import { createReducer, on } from '@ngrx/store';
import {
  PropertyStateInterface,
  SelectedPropertyInterface,
} from './../model/propertyState.interface';
import { PropertiesActions } from './actions';
import { EnquiriesAction } from '../../enquiries/store/actions';

const initialSelectedProperty: SelectedPropertyInterface = {
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
  on(PropertiesActions.getPropertiesSuccess, (state, action) => {
    let bottomReached = false;
    let page = 1;
    if (action.properties.length < 8) {
      page = 0;
      bottomReached = true;
    }
    return {
      ...state,
      page: state.page + page,
      properties: [...state.properties, ...action.properties],
      mostBottomReached: bottomReached,
    };
  }),
  on(PropertiesActions.getPropertiesFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(PropertiesActions.addPropertySuccess, (state, action) => ({
    ...state,
    properties: [...state.properties, action.property],
    ownProperties: [...state.ownProperties, action.property],
  })),
  on(PropertiesActions.updatePropertySuccess, (state, action) => {
    let newProperties: PropertyModelInterface[];
    let newOwnProperties: PropertyModelInterface[];
    const allIndex = state.properties.findIndex(
      (el) => el._id === state.selectedProperty?.property?._id,
    );
    const ownIndex = state.ownProperties.findIndex(
      (el) => el._id === state.selectedProperty?.property?._id,
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
  on(PropertiesActions.getOneProperty, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PropertiesActions.getOnePropertySuccess, (state, action) => {
    let isFavorite = false;
    if (state.favoriteIds.includes(action.property._id)) {
      isFavorite = true;
    }
    return {
      ...state,
      selectedProperty: {
        isFavorite: isFavorite,
        property: action.property,
      },
    };
  }),
  on(PropertiesActions.getOwnPropertiesSuccess, (state, action) => ({
    ...state,
    ownProperties: action.ownProperties,
  })),
  on(PropertiesActions.deletePropertySuccess, (state) => {
    let newProperties: PropertyModelInterface[];
    let newOwnProperties: PropertyModelInterface[];
    const allIndex = state.properties.findIndex(
      (el) => el._id === state.selectedProperty?.property?._id,
    );
    const ownIndex = state.ownProperties.findIndex(
      (el) => el._id === state.selectedProperty?.property?._id,
    );
    if (allIndex !== -1) {
      newProperties = state.properties.filter(
        (el) => el._id !== state.selectedProperty?.property?._id,
      );
    } else {
      newProperties = [...state.properties];
    }
    if (ownIndex !== -1) {
      newOwnProperties = state.ownProperties.filter(
        (el) => el._id !== state.selectedProperty?.property?._id,
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
  on(PropertiesActions.getFavoritesSuccess, (state, action) => ({
    ...state,
    favorites: action.favProperties,
  })),
  on(PropertiesActions.getFavoriteIdsSuccess, (state, action) => ({
    ...state,
    favoriteIds: action.favoriteProperties,
  })),
  on(PropertiesActions.favorPropertySuccess, (state, action) => ({
    ...state,
    selectedProperty: { ...state.selectedProperty, isFavorite: true },
    favoriteIds: [...state.favoriteIds, action.id],
  })),
  on(PropertiesActions.unfavorPropertySuccess, (state, action) => ({
    ...state,
    selectedProperty: { ...state.selectedProperty, isFavorite: false },
    favoriteIds: state.favoriteIds.filter((el) => el !== action.id),
  })),
  on(PropertiesActions.searchPropertiesSuccess, (state, action) => ({
      ...state,
      properties: action.searchResult,
  })),
  on(EnquiriesAction.createEnquirySuccess, (state, action) => {
    const modifiedProperty = JSON.parse(
      JSON.stringify(state.selectedProperty.property),
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
  }),
);
