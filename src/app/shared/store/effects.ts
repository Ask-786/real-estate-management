import { NotificationService } from './../services/notification.service';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as GlobalActions from './actions';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Injectable()
export class GlobalEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  checkAuth$ = createEffect(() =>
    this.action$.pipe(
      ofType(GlobalActions.checkAuth),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.authService.checkAuth().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return GlobalActions.checkAuthSuccess({
              user: data.user,
              token: data.token,
            });
          }),
          catchError((err) => {
            if (err.status === 401) {
              this.authService.removeToken();
              this.store.dispatch(
                GlobalActions.gotError({ error: err.error.message })
              );
              return of(
                GlobalActions.checkAuthFailure({
                  error: err.error.message || 'something went wrong',
                })
              );
            } else {
              this.store.dispatch(
                GlobalActions.gotError({ error: err.error.message })
              );
              return of(
                GlobalActions.checkAuthFailure({
                  error: err.error.message,
                })
              );
            }
          })
        );
      })
    )
  );

  getError$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(GlobalActions.gotError),
        tap((data) => this.notificationService.warn(data.error))
      ),
    { dispatch: false }
  );

  loadingEnd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(GlobalActions.loadingEnd),
        tap((data) => {
          if (data.message) {
            return this.notificationService.sucess(data.message);
          }
        })
      ),
    { dispatch: false }
  );
}
