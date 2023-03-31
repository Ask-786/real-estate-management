import { Router } from '@angular/router';
import { PropertiesService } from '../services/properties.service';
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
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getProperties(data.page).pipe(
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

  updateProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.updateProperty),
      mergeMap((action) => {
        return this.propertyService
          .updateProperty(action.id, action.propertyData, action.images)
          .pipe(
            map((newProperty) => {
              this.store.dispatch(
                GlobalActions.loadingEnd({
                  message: `Updated ${newProperty.title}`,
                })
              );
              return PropertiesActions.UpdatePropertySuccess({ newProperty });
            }),
            catchError((err) => {
              this.store.dispatch(
                GlobalActions.gotError({ error: err.error.message })
              );
              return of(
                PropertiesActions.UpdatePropertyFailure({
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

  favourProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.favourProperty),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.favourProperty(data.id).pipe(
          map((data) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: data.message })
            );
            return PropertiesActions.favourPropertySuccess({ id: data.id });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(PropertiesActions.favourPropertyFailure());
          })
        );
      })
    )
  );

  unFavourProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.unFavourProperty),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.unFavourProperty(data.id).pipe(
          map((data) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: data.message })
            );
            return PropertiesActions.unFavourPropertySuccess({ id: data.id });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(PropertiesActions.unFavourPropertyFailure());
          })
        );
      })
    )
  );

  getFavorites$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getFavorites),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getFavorites().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return PropertiesActions.getFavoritesSuccess({
              favProperties: data.favoriteProperties,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(PropertiesActions.getFavoritesFailure());
          })
        );
      })
    )
  );

  getFavoriteIds$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.getFavoriteIds),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getFavoriteIds().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            if (data !== null) {
              return PropertiesActions.getFavoriteIdsSuccess({
                user: data.user,
                favoriteProperties: data.favoriteProperties,
              });
            } else {
              return PropertiesActions.getFavoriteIdsFailure();
            }
          }),
          catchError((err) => {
            console.log(err);
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(PropertiesActions.getFavoritesFailure());
          })
        );
      })
    )
  );

  searchProperties$ = createEffect(() =>
    this.action$.pipe(
      ofType(PropertiesActions.searchProperties),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService
          .searchProperties(data.searchValue, data.sortValue, data.filterValue)
          .pipe(
            map((data) => {
              this.store.dispatch(GlobalActions.loadingEnd({}));
              return PropertiesActions.searchPropertiesSuccess({
                searchResult: data,
              });
            }),
            catchError((err) => {
              this.store.dispatch(
                GlobalActions.gotError({ error: err.error.message })
              );
              return of(PropertiesActions.searchPropertiesFailure());
            })
          );
      })
    )
  );
}
