import { EnquiryDiscussionService } from './../services/enquiry-discussion.service';
import { Store } from '@ngrx/store';
import { EnquiriesService } from '../services/enquiries.service';
import { map, mergeMap, catchError, of, tap } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as EnquiryActions from './actions';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Injectable()
export class EnquiryEffects {
  constructor(
    private action$: Actions,
    private enquiriesService: EnquiriesService,
    private store: Store<AppStateInterface>,
    private enquiryDiscussionService: EnquiryDiscussionService
  ) {}

  createEnquiry$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiryActions.createEnquiry),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.createEnquiry(data.data).pipe(
          map((data) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: 'Successfully Enquired' })
            );
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
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return EnquiryActions.getEnquiriesSuccess({
              enquiries: data.enquiries,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(EnquiryActions.getEnquiriesFailure());
          })
        );
      })
    )
  );

  getOneEnquiry$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiryActions.getOneEnquiry),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.getOneEnquiry(data.id).pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return EnquiryActions.getOneEnquirySuccess({
              enquiry: data.enquiry,
              discussions: data.discussions,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(EnquiryActions.getOneEnquiryFailure());
          })
        );
      })
    )
  );

  getUserEnquiries$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiryActions.getUserEnquiries),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.getUserEnquiries().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return EnquiryActions.getUserEnquiriesSuccess({
              enquiries: data.enquiries,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(EnquiryActions.getUserEnquiriesFailure());
          })
        );
      })
    )
  );

  sendNewMessage$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(EnquiryActions.sentNewMessage),
        tap((data) =>
          this.enquiryDiscussionService.sendMessage(
            data.newMessage.message,
            data.newMessage.enquiry,
            data.newMessage.sender
          )
        )
      ),
    { dispatch: false }
  );
}
