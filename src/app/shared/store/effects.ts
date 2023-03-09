import { AuthenticationService } from './../../modules/authentication/authentication.service';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as GlobalActions from './actions';

@Injectable()
export class GlobalEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private authService: AuthenticationService
  ) {}
  checkAuth$ = createEffect(() =>
    this.action$.pipe(
      ofType(GlobalActions.checkAuth),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.authService.checkAuth().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd());
            return GlobalActions.checkAuthSuccess({
              user: data.user,
              token: data.token,
            });
          }),
          catchError((err) => {
            this.authService.removeToken();
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(
              GlobalActions.checkAuthFailure({
                error: err.error.message,
              })
            );
          })
        );
      })
    )
  );
}
