import { createAction, props } from '@ngrx/store';

export const getNotifications = createAction(
  '[Notifications] Get Notifications'
);
export const getNotificationsSuccess = createAction(
  '[Notifications] Get Notifications Success',
  props<{ notifications: any }>()
);
export const getNotificationsFailure = createAction(
  '[Notifications] Get Notifications Failure'
);
