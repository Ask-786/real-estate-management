import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';

const selectFeatrue = (state: AppStateInterface) => state.notifications;

export const notificationsSelector = createSelector(
  selectFeatrue,
  (state) => state.notifications
);
