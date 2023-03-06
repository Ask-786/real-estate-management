import { createAction, props } from '@ngrx/store';

export const loadingStart = createAction('[Gobal State] Loading Started');
export const loadingEnd = createAction('[Global State] Loading Ended');
export const gotError = createAction(
  '[Global State] Got Error',
  props<{ error: string }>()
);
