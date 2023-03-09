import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as GlobalActions from './shared/store/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}
  title = 'Real-Estate-Management';

  ngOnInit() {
    this.store.dispatch(GlobalActions.checkAuth());
  }
}
