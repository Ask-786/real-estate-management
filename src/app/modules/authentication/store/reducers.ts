import { createReducer, on } from '@ngrx/store';
import { AuthenticationStateInterface } from './../models/authenticationStateInterface';
import * as AuthenticationActions from './actions';

const initialState: AuthenticationStateInterface = {
  isLoggedIn: false,
  token: null,
  user: null,
  isLoading: false,
  registeredUser: null,
};

export const reducers = createReducer(
  initialState,
  on(AuthenticationActions.login, (state) => ({ ...state, isLoading: true })),
  on(AuthenticationActions.loginSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    user: action.user,
    token: action.token,
  })),
  on(AuthenticationActions.loginFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(AuthenticationActions.signup, (state) => ({ ...state, isLoading: true })),
  on(AuthenticationActions.signupSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    registeredUser: action.registeredUser,
  })),
  on(AuthenticationActions.signupFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
