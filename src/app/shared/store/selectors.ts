import { AppStateInterface } from 'src/app/models/appState.interface';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppStateInterface) => state.global;
export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
