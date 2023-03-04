import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.properties;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const propertiesSelector = createSelector(
  selectFeature,
  (state) => state.properties
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectedPropertySelector = createSelector(
  selectFeature,
  (state) => state.selectedProperty
);

export const propertyPageSelector = createSelector(
  selectFeature,
  (state) => state.page
);
export const mostBottomReachedSelector = createSelector(
  selectFeature,
  (state) => state.mostBottomReached
);
