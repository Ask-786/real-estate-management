import { EnquiryDiscussionService } from './../services/enquiry-discussion.service';
import { Store } from '@ngrx/store';
import { EnquiriesService } from '../services/enquiries.service';
import { map, mergeMap, catchError, of, tap } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { EnquiriesAction } from './actions';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Injectable()
export class EnquiryEffects {
  constructor(
    private action$: Actions,
    private enquiriesService: EnquiriesService,
    private store: Store<AppStateInterface>,
    private enquiryDiscussionService: EnquiryDiscussionService,
  ) {}

  createEnquiry$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiriesAction.createEnquiry),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.createEnquiry(data.data).pipe(
          map((data) => {
            this.store.dispatch(
              GlobalActions.loadingEnd({ message: 'Successfully Enquired' }),
            );
            return EnquiriesAction.createEnquirySuccess({
              createdEnquiry: data.createdEnquiry,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(EnquiriesAction.createEnquiryFailure());
          }),
        );
      }),
    ),
  );

  getEnquiries$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiriesAction.getEnquiries),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.getEnquiries().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return EnquiriesAction.getEnquiriesSuccess({
              enquiries: data.enquiries,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(EnquiriesAction.getEnquiriesFailure());
          }),
        );
      }),
    ),
  );

  getOneEnquiry$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiriesAction.getOneEnquiry),
      mergeMap((data) => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.getOneEnquiry(data.id).pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return EnquiriesAction.getOneEnquirySuccess({
              enquiry: data.enquiry,
              discussions: data.discussions,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(EnquiriesAction.getOneEnquiryFailure());
          }),
        );
      }),
    ),
  );

  getUserEnquiries$ = createEffect(() =>
    this.action$.pipe(
      ofType(EnquiriesAction.getUserEnquiries),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.enquiriesService.getUserEnquiries().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return EnquiriesAction.getUserEnquiriesSuccess({
              enquiries: data.enquiries,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message }),
            );
            return of(EnquiriesAction.getUserEnquiriesFailure());
          }),
        );
      }),
    ),
  );

  sendNewMessage$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(EnquiriesAction.sentNewMessage),
        tap((data) =>
          this.enquiryDiscussionService.sendMessage(
            data.newMessage.message,
            data.newMessage.enquiry,
            data.newMessage.sender,
          ),
        ),
      ),
    { dispatch: false },
  );
}
