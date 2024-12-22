import { NotificationService } from './../services/notification.service';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { GlobalService } from '../services/global.service';
import { GlobalActions } from './actions';

@Injectable()
export class GlobalEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private globalService: GlobalService,
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
            }
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(
              GlobalActions.checkAuthFailure({
                error: err.error.message || 'something went wrong',
              }),
            );
          }),
        );
      }),
    ),
  );

  getFavorites$ = createEffect(() =>
    this.action$.pipe(
      ofType(GlobalActions.getFavoritesCount),
      mergeMap(() =>
        this.globalService.getFavoritesCount().pipe(
          map((data) => {
            return GlobalActions.getFavoritesCountSuccess({
              count: data.count,
            });
          }),
          catchError((err) =>
            of(GlobalActions.gotError({ error: err.error.message })),
          ),
        ),
      ),
    ),
  );

  getNotifications$ = createEffect(() =>
    this.action$.pipe(
      ofType(GlobalActions.getNotificationsCount),
      mergeMap(() =>
        this.globalService.getNotificationsCount().pipe(
          map((data) => {
            return GlobalActions.getNotificationsCountSuccess({
              count: data.count,
            });
          }),
          catchError((err) =>
            of(GlobalActions.gotError({ error: err.error.message })),
          ),
        ),
      ),
    ),
  );

  getError$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(GlobalActions.gotError),
        tap((data) => this.notificationService.warn(data.error)),
      ),
    { dispatch: false },
  );

  loadingEnd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(GlobalActions.loadingEnd),
        tap((data) => {
          if (data.message) {
            return this.notificationService.sucess(data.message);
          }
        }),
      ),
    { dispatch: false },
  );
}
