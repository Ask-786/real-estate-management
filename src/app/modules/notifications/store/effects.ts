import { mergeMap, map, catchError, of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as NotificationActions from './actions';
import * as GlobalActions from '../../../shared/store/actions';
import { NotificationsService } from '../services/notifications.service';
import { Store } from '@ngrx/store';

@Injectable()
export class NotificationEffects {
  constructor(
    private action$: Actions,
    private notificationService: NotificationsService,
    private store: Store
  ) {}

  getNotifications$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotificationActions.getNotifications),
      mergeMap(() => {
        this.store.dispatch(GlobalActions.loadingStart());
        return this.notificationService.getNotifications().pipe(
          map((data) => {
            this.store.dispatch(GlobalActions.loadingEnd({}));
            return NotificationActions.getNotificationsSuccess({
              notifications: data.notifications,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              GlobalActions.gotError({ error: err.error.message })
            );
            return of(NotificationActions.getNotificationsFailure());
          })
        );
      })
    )
  );

  changeReadStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotificationActions.changeReadStatus),
      mergeMap((id) =>
        this.notificationService.changeReadStatus(id.notificationId).pipe(
          map((data) =>
            NotificationActions.changeReadStatusSuccess({
              status: data.status,
            })
          ),
          catchError((err) =>
            of(GlobalActions.gotError({ error: err.error.message }))
          )
        )
      )
    )
  );
}
