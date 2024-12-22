import { NotificationsModelInterface } from './model/notificaionModel.interface';
import { AppStateInterface } from './../../models/appState.interface';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { GlobalActions } from 'src/app/shared/store/actions';
import { NotificationActions } from './store/actions';
import { notificationsSelector } from './store/selectors';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [NotificationComponent, RouterLink, AsyncPipe, DatePipe],
})
export class NotificationsComponent implements OnInit {
  notificaions$: Observable<NotificationsModelInterface[]>;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
  ) {
    this.notificaions$ = this.store.pipe(select(notificationsSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Notifications' }));
    this.store.dispatch(NotificationActions.getNotifications());
  }
  onClick(notificationId: string, enquiryId: string) {
    this.store.dispatch(
      NotificationActions.changeReadStatus({ notificationId: notificationId }),
    );
    this.router.navigateByUrl(`/enquiries/enquiry/${enquiryId}`);
  }
}
