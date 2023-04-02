import { createAction, props } from '@ngrx/store';
import { UserModelInterface } from '../models/user.interface';

export const setHeader = createAction(
  '[Gobal] Set Header',
  props<{ header: string }>()
);
export const loadingStart = createAction('[Gobal] Loading Started');
export const loadingEnd = createAction(
  '[Global] Loading Ended',
  props<{ message?: string }>()
);
export const gotError = createAction(
  '[Global] Got Error',
  props<{ error: string }>()
);
export const checkAuth = createAction('[Global] Check Authenticaion');
export const checkAuthSuccess = createAction(
  '[Global] Check Authenticaion Success',
  props<{ user: UserModelInterface; token: string }>()
);
export const checkAuthFailure = createAction(
  '[Global] Check Authenticaion Failure',
  props<{ error: string }>()
);
export const getFavoritesCount = createAction('[Global] Get Favorites Count');
export const getFavoritesCountSuccess = createAction(
  '[Global] Get Favorites Count Success',
  props<{ count: number }>()
);
export const addFavorites = createAction('[Global] Add To Favorites');
export const removeFavorites = createAction('[Global] Remove From Favorites');
export const getNotificationsCount = createAction(
  '[Global] Get Notificaitons Count'
);
export const getNotificationsCountSuccess = createAction(
  '[Global] Get Notificaitons Count Success',
  props<{ count: number }>()
);
