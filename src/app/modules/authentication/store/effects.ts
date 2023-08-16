import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthenticationActions from './actions';
import { map, mergeMap, catchError, of, tap } from 'rxjs';
import * as GlobalActions from '../../../shared/store/actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private action$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<AppStateInterface>,
    private notificationService: NotificationService,
  ) {}

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthenticationActions.login),
      mergeMap((action) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.authService.userLogin(action.loginData).pipe(
          map((data) => {
            this.router.navigateByUrl('map');
            this.store.dispatch(
              GlobalActions.checkAuthSuccess({
                user: data.user,
                token: data.access_token,
              }),
            );
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: 'Successfully Signed In' }),
            );
            return AuthenticationActions.loginSuccess({
              token: data.access_token,
              user: data.user,
            });
          }),
          catchError((err) => {
            this.authService.removeToken();
            this.store.dispatch(
              GlobalActions.checkAuthFailure({ error: err.error.message }),
            );
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(
              AuthenticationActions.loginFailure({ error: err.error.message }),
            );
          }),
        );
      }),
    ),
  );

  logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthenticationActions.logout),
        tap(() => {
          this.router.navigateByUrl('map');
          this.notificationService.sucess('Successfully Logged Out!!');
        }),
      ),
    { dispatch: false },
  );

  signup$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthenticationActions.signup),
      mergeMap((action) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.authService.registerUser(action.userData).pipe(
          map((data) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: data.message }),
            );
            this.router.navigateByUrl('auth/login');
            return AuthenticationActions.signupSuccess({
              successMsg: data.message,
              registeredUser: data.user,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(
              AuthenticationActions.signupFailure({ error: err.error.message }),
            );
          }),
        );
      }),
    ),
  );
}
