import { NotificationService } from './../../../shared/services/notification.service';
import { Store } from '@ngrx/store';
import { EnquiriesService } from './../enquiries.service';
import { map, mergeMap, catchError, of } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as EnquiryActions from './actions';
import * as GlobalActions from '../../../shared/store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Injectable()
export class EnquiryEffects {
  constructor(
    private action$: Actions,
    private enquiriesService: EnquiriesService,
    private store: Store<AppStateInterface>,
    private notificationService: NotificationService
  ) {}

  createEnquiry$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiryActions.createEnquiry),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.createEnquiry(data.data).pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd());
            this.notificationService.sucess('Successfully Enquired');
            return EnquiryActions.createEnquirySuccess({
              createdEnquiry: data.createdEnquiry,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(EnquiryActions.createEnquiryFailure());
          })
        );
      })
    )
  );

  getEnquiries$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiryActions.getEnquiries),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.getEnquiries().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd());
            return EnquiryActions.getEnquiriesSuccess({
              enquiries: data.enquiries,
            });
          }),
          catchError((err) => {
            console.log(err);
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(EnquiryActions.getEnquiriesFailure());
          })
        );
      })
    )
  );
}
