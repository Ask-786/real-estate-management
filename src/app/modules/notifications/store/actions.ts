import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NotificationsModelInterface } from '../model/notificaionModel.interface';

export const NotificationActions = createActionGroup({
  source: '[Notifications]',
  events: {
    'Get Notifications': emptyProps(),
    'Get Notifications Success': props<{
      notifications: NotificationsModelInterface[];
    }>(),
    'Get Notifications Failure': emptyProps(),
    'Change Read Status': props<{ notificationId: string }>(),
    'Change Read Status Success': props<{ status: boolean }>(),
  },
});
