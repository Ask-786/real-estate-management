import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserModelInterface } from '../models/user.interface';

export const GlobalActions = createActionGroup({
  source: '[Gobal]',
  events: {
    'Get Notifications Count': emptyProps(),
    'Get Favorites Count': emptyProps(),
    'Add Favorites': emptyProps(),
    'Remove Favorites': emptyProps(),
    'Set Header': props<{ header: string }>(),
    'Loading Start': emptyProps(),
    'Loading End': props<{ message?: string }>(),
    'Got Error': props<{ error: string }>(),
    'Get Favorites Count Success': props<{ count: number }>(),
    'Get Notifications Count Success': props<{ count: number }>(),
    'Check Auth': emptyProps(),
    'Check Auth Failure': props<{ error: string }>(),
    'Check Auth Success': props<{
      user: UserModelInterface;
      token: string;
    }>(),
  },
});
