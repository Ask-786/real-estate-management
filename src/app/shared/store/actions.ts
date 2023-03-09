import { createAction, props } from '@ngrx/store';
import { UserModelInterface } from '../models/user.interface';

export const loadingStart = createAction('[Gobal State] Loading Started');
export const loadingEnd = createAction('[Global State] Loading Ended');
export const gotError = createAction(
  '[Global State] Got Error',
  props<{ error: string }>()
);
export const checkAuth = createAction('[Authentication] Check Authenticaion');
export const checkAuthSuccess = createAction(
  '[Authentication] Check Authenticaion Success',
  props<{ user: UserModelInterface; token: string }>()
);
export const checkAuthFailure = createAction(
  '[Authentication] Check Authenticaion Failure',
  props<{ error: string }>()
);
