import { createAction, props } from '@ngrx/store';
import { UserModelInterface } from '../models/user.interface';

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
