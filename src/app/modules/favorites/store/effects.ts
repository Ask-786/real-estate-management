import { Store } from '@ngrx/store';
import { FavoritesService } from './../favorites.service';
import { map, mergeMap, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FavoritesActions from './actions';
import * as GlobalActions from '../../../shared/store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Injectable()
export class FavoritesEffects {
  constructor(
    private action$: Actions,
    private favoriteService: FavoritesService,
    private store: Store<AppStateInterface>
  ) {}

  favourProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(FavoritesActions.favourProperty),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.favoriteService.favourProperty(data.id).pipe(
          map((data) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: data.message })
            );
            return FavoritesActions.favourPropertySuccess();
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(FavoritesActions.favourPropertyFailure());
          })
        );
      })
    )
  );

  getFavorites$ = createEffect(() =>
    this.action$.pipe(
      ofType(FavoritesActions.getFavorites),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.favoriteService.getFavorites().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return FavoritesActions.getFavoritesSuccess({
              favProperties: data.favoriteProperties,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(FavoritesActions.getFavoritesFailure());
          })
        );
      })
    )
  );
}
