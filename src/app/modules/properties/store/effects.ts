import { PropertiesService } from './../properties.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as PropertiesActions from './actions';

@Injectable()
export class PropertiesEffects {
  constructor(
    private action$: Actions,
    private propertyService: PropertiesService
  ) {}

  getPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getProperties),
      mergeMap(() => {
        return this.propertyService.getProperties().pipe(
          map(
            (properties) =>
              PropertiesActions.getPropertiesSuccess({ properties }),
            catchError((error) =>
              of(
                PropertiesActions.getPropertiesFailure({ error: error.message })
              )
            )
          )
        );
      })
    )
  );
}
