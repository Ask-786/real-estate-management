import { AppStateInterface } from 'src/app/models/appState.interface';
import { createSelector } from '@ngrx/store';

const selectFeature = (state: AppStateInterface) => state.favorites;

export const favPropertiesSelector = createSelector(
  selectFeature,
  (state) => state.favorites
);
