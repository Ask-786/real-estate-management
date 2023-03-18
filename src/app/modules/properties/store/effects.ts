import { Router } from '@angular/router';
import { PropertiesService } from './../properties.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as PropertiesActions from './actions';
import { Store } from '@ngrx/store';
import * as GlobalActions from '../../../shared/store/actions';

@Injectable()
export class PropertiesEffects {
  constructor(
    private action$: Actions,
    private propertyService: PropertiesService,
    private store: Store,
    private router: Router
  ) {}

  getProperties$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getProperties),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getProperties().pipe(
          map(
            (properties) => {
              this.store.dispatch(GlobalActions.loadingEnd({}));
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
        return this.propertyService
          .addProperty(action.propertyData, action.images)
          .pipe(
            map((property) => {
              this.store.dispatch(
                GlobalActions.loadingEnd({ message: `Added ${property.title}` })
              );
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
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return PropertiesActions.getOnePropertySuccess({ property });
          }),
          catchError((err) => {
            this.router.navigateByUrl('properties');
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

  getOwnProperties$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getOwnProperties),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getOwnProperties().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return PropertiesActions.getOwnPropertiesSuccess({
              ownProperties: data,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(PropertiesActions.getOwnPropertiesFailure());
          })
        );
      })
    )
  );

  deletePropoerty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.deleteProperty),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.deleteProperty(data.id).pipe(
          map(() => {
            this.store.dispatch(
              GlobalActions.loadingEnd({
                message: 'Property Deleted Successfully',
              })
            );
            this.router.navigateByUrl('properties/own-properties');
            return PropertiesActions.deletePropertySuccess();
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(PropertiesActions.deletePropertyFailure());
          })
        );
      })
    )
  );
}