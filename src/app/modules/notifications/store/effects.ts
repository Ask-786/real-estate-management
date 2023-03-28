import { mergeMap, map, catchError, of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as NotificationActions from './actions';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class NotificationEffects {
  constructor(
    private action$: Actions,
    private notificationService: NotificationsService
  ) {}

  getNotifications$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotificationActions.getNotifications),
      mergeMap(() =>
        this.notificationService.getNotifications().pipe(
          map((data) =>
            NotificationActions.getNotificationsSuccess({
              notifications: data,
            })
          ),
          catchError(() => of(NotificationActions.getNotificationsFailure()))
        )
      )
    )
  );
}
