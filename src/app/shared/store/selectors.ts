import { AppStateInterface } from 'src/app/models/appState.interface';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppStateInterface) => state.global;
export const selectHeader = createSelector(
  selectFeature,
  (state) => state.header,
);

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading,
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error,
);

export const userSelector = createSelector(
  selectFeature,
  (state) => state.user,
);

export const tokenSelector = createSelector(
  selectFeature,
  (state) => state.token,
);

export const isLoggedInSelector = createSelector(
  selectFeature,
  (state) => state.isLoggedIn,
);

export const favoritesCountSelector = createSelector(
  selectFeature,
  (state) => state.favoritesCount,
);

export const notificationsCountSelector = createSelector(
  selectFeature,
  (state) => state.notificatiosCount,
);
