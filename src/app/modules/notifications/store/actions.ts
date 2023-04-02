import { createAction, props } from '@ngrx/store';
import { NotificationsModelInterface } from '../model/notificaionModel.interface';

export const getNotifications = createAction(
  '[Notifications] Get Notifications'
);
export const getNotificationsSuccess = createAction(
  '[Notifications] Get Notifications Success',
  props<{ notifications: NotificationsModelInterface[] }>()
);
export const getNotificationsFailure = createAction(
  '[Notifications] Get Notifications Failure'
);
export const changeReadStatus = createAction(
  '[Notifications] Change Read Status',
  props<{ notificationId: string }>()
);
export const changeReadStatusSuccess = createAction(
  '[Notifications] Change Read Status Success',
  props<{ status: boolean }>()
);
