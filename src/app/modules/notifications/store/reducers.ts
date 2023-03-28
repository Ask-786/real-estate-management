import { createReducer, on } from '@ngrx/store';
import { NotificationStateInterface } from '../model/notificationState.interface';
import * as NotificationActions from './actions';

const initialState: NotificationStateInterface = {
  notifications: null,
};

export const reducers = createReducer(
  initialState,
  on(NotificationActions.getNotificationsSuccess, (state, action) => ({
    ...state,
    notifications: action.notifications,
  }))
);
