import { createReducer, on } from '@ngrx/store';
import { AuthenticationStateInterface } from './../models/authenticationStateInterface';
import * as AuthenticationActions from './actions';

const initialState: AuthenticationStateInterface = {
  registeredUser: null,
};

export const reducers = createReducer(
  initialState,
  on(AuthenticationActions.signupSuccess, (state, action) => ({
    ...state,
    registeredUser: action.registeredUser,
  }))
);
