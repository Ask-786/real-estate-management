import { createReducer, on } from '@ngrx/store';
import { AuthenticationStateInterface } from './../models/authenticationStateInterface';
import { AuthActions } from './actions';

const initialState: AuthenticationStateInterface = {
  registeredUser: null,
};

export const reducers = createReducer(
  initialState,
  on(AuthActions.signupSuccess, (state, action) => ({
    ...state,
    registeredUser: action.registeredUser,
  })),
);
