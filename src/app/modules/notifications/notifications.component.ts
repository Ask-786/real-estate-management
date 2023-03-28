import { AppStateInterface } from './../../models/appState.interface';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as GlobalActions from '../../shared/store/actions';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}
  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Notifications' }));
  }
}
