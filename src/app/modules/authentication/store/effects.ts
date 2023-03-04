import { Router } from '@angular/router';
import { NotificationService } from './../../../shared/services/notification.service';
import { AuthenticationService } from './../authentication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthenticationActions from './actions';
import { map, mergeMap, catchError, of, tap } from 'rxjs';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private action$: Actions,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthenticationActions.login),
      mergeMap((action) =>
        this.authService.userLogin(action.loginData).pipe(
          map((data) =>
            AuthenticationActions.loginSuccess({
              token: data.access_token,
              user: data.user,
            })
          ),
          catchError((err) =>
            of(AuthenticationActions.loginFailure({ error: err.error.message }))
          )
        )
      )
    )
  );
  signup$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthenticationActions.signup),
      mergeMap((action) =>
        this.authService.registerUser(action.userData).pipe(
          map((data) =>
            AuthenticationActions.signupSuccess({
              successMsg: data.message,
              registeredUser: data.user,
            })
          ),
          catchError((err) =>
            of(
              AuthenticationActions.signupFailure({ error: err.error.message })
            )
          )
        )
      )
    )
  );

  loginSuccessNotifications$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthenticationActions.loginSuccess),
        tap(() => {
          this.notificationService.sucess('Successfully logged in');
          this.router.navigateByUrl('map');
        })
      ),
    { dispatch: false }
  );
  loginFailureNotifications$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthenticationActions.loginFailure),
        tap((data) => this.notificationService.sucess(data.error))
      ),
    { dispatch: false }
  );
  signupSuccessNotifications$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthenticationActions.signupSuccess),
        tap((data) => {
          this.notificationService.sucess(data.successMsg);
          this.router.navigateByUrl('auth/login');
        })
      ),
    { dispatch: false }
  );
  signupFailureNotifications$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthenticationActions.signupFailure),
        tap((data) => this.notificationService.warn(data.error))
      ),
    { dispatch: false }
  );
}
