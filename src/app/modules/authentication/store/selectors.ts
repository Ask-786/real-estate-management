import { createSelector } from '@ngrx/store';
import { AppStateInterface } from './../../../models/appState.interface';

export const featureSelect = (state: AppStateInterface) => state.authentication;

export const isLoggedInSelector = createSelector(
  featureSelect,
  (state) => state.isLoggedIn
);
export const isLoadingSelector = createSelector(
  featureSelect,
  (state) => state.isLoading
);
export const registeredUserSelector = createSelector(
  featureSelect,
  (state) => state.registeredUser
);
