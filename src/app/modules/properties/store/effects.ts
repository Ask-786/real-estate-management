import { NotificationService } from './../../../shared/services/notification.service';
import { PropertiesService } from './../properties.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as PropertiesActions from './actions';

@Injectable()
export class PropertiesEffects {
  constructor(
    private action$: Actions,
    private propertyService: PropertiesService,
    private notificationService: NotificationService
  ) {}

  getProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getProperties),
      mergeMap(() => {
        return this.propertyService.getProperties().pipe(
          map(
            (properties) =>
              PropertiesActions.getPropertiesSuccess({ properties }),
            catchError((err) =>
              of(PropertiesActions.getPropertiesFailure({ error: err.message }))
            )
          )
        );
      })
    )
  );

  addProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.addProperty),
      mergeMap((action) => {
        return this.propertyService
          .addProperty(action.propertyData, action.images)
          .pipe(
            map((property) =>
              PropertiesActions.addPropertySuccess({ property })
            ),
            catchError((err) =>
              of(
                PropertiesActions.addPropertyFailure({
                  error: err.error.message,
                })
              )
            )
          );
      })
    )
  );

  getOneProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getOneProperty),
      mergeMap((property) => {
        return this.propertyService.getOneProperty(property.propertyId).pipe(
          map((property) => {
            return PropertiesActions.getOnePropertySuccess({ property });
          }),
          catchError((err) =>
            of(
              PropertiesActions.getOnePropertyFailure({
                error: err.error.message,
              })
            )
          )
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
