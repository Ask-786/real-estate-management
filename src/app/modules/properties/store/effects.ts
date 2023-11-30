import { Router } from '@angular/router';
import { PropertiesService } from '../services/properties.service';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  getProperties,
  getPropertiesSuccess,
  getPropertiesFailure,
  addProperty,
  addPropertySuccess,
  addPropertyFailure,
  updateProperty,
  updatePropertySuccess,
  updatePropertyFailure,
  getOneProperty,
  getOnePropertySuccess,
  getOnePropertyFailure,
  getOwnProperties,
  getOwnPropertiesSuccess,
  getOwnPropertiesFailure,
  deleteProperty,
  deletePropertySuccess,
  deletePropertyFailure,
  favourProperty,
  favourPropertySuccess,
  favourPropertyFailure,
  unFavourProperty,
  unFavourPropertySuccess,
  unFavourPropertyFailure,
  getFavorites,
  getFavoritesSuccess,
  getFavoritesFailure,
  getFavoriteIds,
  getFavoriteIdsSuccess,
  getFavoriteIdsFailure,
  searchProperties,
  searchPropertiesSuccess,
  searchPropertiesFailure,
} from './actions';
import { Store } from '@ngrx/store';
import { GlobalActions } from 'src/app/shared/store/actions';

@Injectable()
export class PropertiesEffects {
  private action$ = inject(Actions);
  private propertyService = inject(PropertiesService);
  private store = inject(Store);
  private router = inject(Router);

  getProperties$ = createEffect(() =>
    this.action$.pipe(
      ofType(getProperties),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getProperties(data.page).pipe(
          map((properties) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return getPropertiesSuccess({ properties });
          }),
          catchError((err) => {
            this.store.dispatch(GlobalActions.gotError({ error: err.message }));
            return of(getPropertiesFailure({ error: err.message }));
          }),
        );
      }),
    ),
  );

  addProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(addProperty),
      mergeMap((action) => {
        return this.propertyService.addProperty(action.propertyData).pipe(
          map((property) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: `Added ${property.title}` }),
            );
            return addPropertySuccess({ property });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(
              addPropertyFailure({
                error: err.error.message,
              }),
            );
          }),
        );
      }),
    ),
  );

  updateProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateProperty),
      mergeMap((action) => {
        return this.propertyService
          .updateProperty(action.id, action.propertyData, action.images)
          .pipe(
            map((newProperty) => {
              this.store.dispatch(
                GlobalActions.loadingEnd({
                  message: `Updated ${newProperty.title}`,
                }),
              );
              return updatePropertySuccess({ newProperty });
            }),
            catchError((err) => {
              this.store.dispatch(
                GlobalActions.gotError({ error: err.error.message }),
              );
              return of(
                updatePropertyFailure({
                  error: err.error.message,
                }),
              );
            }),
          );
      }),
    ),
  );

  getOneProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(getOneProperty),
      mergeMap((property) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getOneProperty(property.propertyId).pipe(
          map((property) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return getOnePropertySuccess({ property });
          }),
          catchError((err) => {
            this.router.navigateByUrl('properties');
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(
              getOnePropertyFailure({
                error: err.error.message,
              }),
            );
          }),
        );
      }),
    ),
  );

  getOwnProperties$ = createEffect(() =>
    this.action$.pipe(
      ofType(getOwnProperties),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getOwnProperties().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return getOwnPropertiesSuccess({
              ownProperties: data,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(getOwnPropertiesFailure());
          }),
        );
      }),
    ),
  );

  deletePropoerty$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteProperty),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.deleteProperty(data.id).pipe(
          map(() => {
            this.store.dispatch(
              GlobalActions.loadingEnd({
                message: 'Property Deleted Successfully',
              }),
            );
            this.router.navigateByUrl('properties/own-properties');
            return deletePropertySuccess();
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(deletePropertyFailure());
          }),
        );
      }),
    ),
  );

  favourProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(favourProperty),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.favourProperty(data.id).pipe(
          map((data) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: data.message }),
            );
            this.store.dispatch(GlobalActions.addFavorites());
            return favourPropertySuccess({ id: data.id });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(favourPropertyFailure());
          }),
        );
      }),
    ),
  );

  unFavourProperty$ = createEffect(() =>
    this.action$.pipe(
      ofType(unFavourProperty),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.unFavourProperty(data.id).pipe(
          map((data) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: data.message }),
            );
            this.store.dispatch(GlobalActions.removeFavorites());
            return unFavourPropertySuccess({ id: data.id });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(unFavourPropertyFailure());
          }),
        );
      }),
    ),
  );

  getFavorites$ = createEffect(() =>
    this.action$.pipe(
      ofType(getFavorites),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getFavorites().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return getFavoritesSuccess({
              favProperties: data.favoriteProperties,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(getFavoritesFailure());
          }),
        );
      }),
    ),
  );

  getFavoriteIds$ = createEffect(() =>
    this.action$.pipe(
      ofType(getFavoriteIds),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService.getFavoriteIds().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            if (data !== null) {
              return getFavoriteIdsSuccess({
                user: data.user,
                favoriteProperties: data.favoriteProperties,
              });
            } else {
              return getFavoriteIdsFailure();
            }
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(getFavoritesFailure());
          }),
        );
      }),
    ),
  );

  searchProperties$ = createEffect(() =>
    this.action$.pipe(
      ofType(searchProperties),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.propertyService
          .searchProperties(
            data.searchValue,
            data.sortValue?.value,
            data.sortValue?.desc,
            data.filterValue,
          )
          .pipe(
            map((data) => {
              this.store.dispatch(GlobalActions.loadingEnd({}));
              return searchPropertiesSuccess({
                searchResult: data,
              });
            }),
            catchError((err) => {
              this.store.dispatch(
                GlobalActions.gotError({ error: err.error.message }),
              );
              return of(searchPropertiesFailure());
            }),
          );
      }),
    ),
  );
}
