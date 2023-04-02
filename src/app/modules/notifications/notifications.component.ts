import { NotificationsModelInterface } from './model/notificaionModel.interface';
import { AppStateInterface } from './../../models/appState.interface';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as GlobalActions from '../../shared/store/actions';
import * as NotificationsActions from './store/actions';
import * as NotificationsSelectors from './store/selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notificaions$: Observable<NotificationsModelInterface[]>;

  constructor(private store: Store<AppStateInterface>, private router: Router) {
    this.notificaions$ = this.store.pipe(
      select(NotificationsSelectors.notificationsSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Notifications' }));
    this.store.dispatch(NotificationsActions.getNotifications());
  }
  onClick(notificationId: string, enquiryId: string) {
    this.store.dispatch(
      NotificationsActions.changeReadStatus({ notificationId: notificationId })
    );
    this.router.navigateByUrl(`/enquiries/enquiry/${enquiryId}`);
  }
}
