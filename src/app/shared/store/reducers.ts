import { createReducer, on } from '@ngrx/store';
import { GlobalStateInterface } from '../models/globalStateInterface';
import * as CommonActions from './actions';

const initialState: GlobalStateInterface = {
  isLoading: false,
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(CommonActions.loadingStart, (state) => ({ ...state, isLoading: true })),
  on(CommonActions.loadingEnd, (state) => ({ ...state, isLoading: false })),
  on(CommonActions.gotError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
