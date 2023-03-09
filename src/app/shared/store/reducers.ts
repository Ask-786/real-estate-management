import { createReducer, on } from '@ngrx/store';
import { GlobalStateInterface } from '../models/globalStateInterface';
import * as CommonActions from './actions';
import * as GlobalActions from './actions';
import * as AuthenticationActions from '../../modules/authentication/store/actions';

const initialState: GlobalStateInterface = {
  isLoading: false,
  error: null,
  user: null,
  isLoggedIn: false,
  token: null,
};

export const reducers = createReducer(
  initialState,
  on(CommonActions.loadingStart, (state) => ({ ...state, isLoading: true })),
  on(CommonActions.loadingEnd, (state) => ({ ...state, isLoading: false })),
  on(CommonActions.gotError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(GlobalActions.checkAuth, (state) => ({ ...state })),
  on(GlobalActions.checkAuthSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isLoggedIn: true,
    token: action.token,
  })),
  on(GlobalActions.checkAuthFailure, (state, action) => ({
    user: null,
    isLoading: false,
    isLoggedIn: false,
    token: null,
    error: action.error,
  })),
  on(AuthenticationActions.logout, (state) => ({
    ...state,
    user: null,
    isLoading: false,
    isLoggedIn: false,
    token: null,
  }))
);
