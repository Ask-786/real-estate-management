import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';

const selectFeature = (state: AppStateInterface) => state.properties;

export const propertiesSelector = createSelector(
  selectFeature,
  (state) => state.properties
);

export const selectedPropertySelector = createSelector(
  selectFeature,
  (state) => state.selectedProperty,
);

export const propertyPageSelector = createSelector(
  selectFeature,
  (state) => state.page
);
export const mostBottomReachedSelector = createSelector(
  selectFeature,
  (state) => state.mostBottomReached
);
export const ownPrpoertiesSelector = createSelector(
  selectFeature,
  (state) => state.ownProperties
);

export const favPropertiesSelector = createSelector(
  selectFeature,
  (state) => state.favorites
);

export const favoriteIdsSelector = createSelector(
  selectFeature,
  (state) => state.favoriteIds
);
