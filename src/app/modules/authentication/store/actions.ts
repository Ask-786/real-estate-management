import { LoginForm, SignUpForm } from './../models/authentication.model';
import { UserModelInterface } from '../../../shared/models/user.interface';
import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: '[Authentication]',
  events: {
    Login: props<{ loginData: LoginForm }>(),
    Logout: emptyProps(),
    'Login Success': props<{ token: string; user: UserModelInterface }>(),
    'Login Failure': props<{ error: string }>(),
    Signup: props<{ userData: SignUpForm }>(),
    'Signup Success': props<{
      successMsg: string;
      registeredUser: UserModelInterface;
    }>(),
    'Signup Failure': props<{ error: string }>(),
  },
});
