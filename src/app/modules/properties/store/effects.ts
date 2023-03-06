import { NotificationService } from './../../../shared/services/notification.service';
import { PropertiesService } from './../properties.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as PropertiesActions from './actions';
import { Store } from '@ngrx/store';
import * as GlobalActions from '../../../shared/store/actions';

@Injectable()
export class PropertiesEffects {
  constructor(
    private action$: Actions,
    private propertyService: PropertiesService,
    private notificationService: NotificationService,
    private store: Store
  ) {}

  getProperties$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getProperties),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getProperties().pipe(
          map(
            (properties) => {
              this.store.dispatch(GlobalActions.loadingEnd());
              return PropertiesActions.getPropertiesSuccess({ properties });
            },
            catchError((err) => {
              this.store.dispatch(
                GlobalActions.gotError({ error: err.message })
              );
              return of(
                PropertiesActions.getPropertiesFailure({ error: err.message })
              );
            })
          )
        );
      })
    )
  );

  addProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.addProperty),
      mergeMap((action) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService
          .addProperty(action.propertyData, action.images)
          .pipe(
            map((property) => {
              this.store.dispatch(GlobalActions.loadingEnd());
              return PropertiesActions.addPropertySuccess({ property });
            }),
            catchError((err) => {
              this.store.dispatch(
                GlobalActions.gotError({ error: err.error.message })
              );
              return of(
                PropertiesActions.addPropertyFailure({
                  error: err.error.message,
                })
              );
            })
          );
      })
    )
  );

  getOneProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getOneProperty),
      mergeMap((property) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getOneProperty(property.propertyId).pipe(
          map((property) => {
            this.store.dispatch(GlobalActions.loadingEnd());
            return PropertiesActions.getOnePropertySuccess({ property });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(
              PropertiesActions.getOnePropertyFailure({
                error: err.error.message,
              })
            );
          })
        );
      })
    )
  );

  addPropertySuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(PropertiesActions.addPropertySuccess),
        tap(() => {
          this.notificationService.sucess('Property Added Succesfully');
        })
      ),
    { dispatch: false }
  );

  addPropertyError$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(PropertiesActions.addPropertyFailure),
        tap((action) => {
          this.notificationService.warn(action.error);
        })
      ),
    { dispatch: false }
  );
}
