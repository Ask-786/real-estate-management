import { LoginForm, SignUpForm } from './../models/authentication.model';
import { UserModelInterface } from '../../../shared/models/user.interface';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Authentication] Login',
  props<{ loginData: LoginForm }>()
);
export const logout = createAction('[Authentication] Logout');
export const loginSuccess = createAction(
  '[Authentication] Login Success',
  props<{ token: string; user: UserModelInterface }>()
);
export const loginFailure = createAction(
  '[Authentication] Login Failure',
  props<{ error: string }>()
);
export const signup = createAction(
  '[Authentication] SignUp',
  props<{ userData: SignUpForm }>()
);
export const signupSuccess = createAction(
  '[Authentication] SignUp Success',
  props<{ successMsg: string; registeredUser: UserModelInterface }>()
);
export const signupFailure = createAction(
  '[Authentication] SignUp Failure',
  props<{ error: string }>()
);
