import { createSelector } from '@ngrx/store';
import { AppStateInterface } from './../../../models/appState.interface';

export const featureSelect = (state: AppStateInterface) => state.authentication;

export const registeredUserSelector = createSelector(
  featureSelect,
  (state) => state.registeredUser,
);
