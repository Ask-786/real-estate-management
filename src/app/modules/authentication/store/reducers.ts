import { createReducer, on } from '@ngrx/store';
import { AuthenticationStateInterface } from './../models/authenticationStateInterface';
import * as AuthenticationActions from './actions';

const initialState: AuthenticationStateInterface = {
  isLoggedIn: false,
  token: null,
  user: null,
  registeredUser: null,
};

export const reducers = createReducer(
  initialState,
  on(AuthenticationActions.login, (state) => ({ ...state })),
  on(AuthenticationActions.loginSuccess, (state, action) => ({
    ...state,
    isLoggedIn: true,
    user: action.user,
    token: action.token,
  })),
  on(AuthenticationActions.signup, (state) => ({ ...state, isLoading: true })),
  on(AuthenticationActions.signupSuccess, (state, action) => ({
    ...state,
    registeredUser: action.registeredUser,
  }))
);
