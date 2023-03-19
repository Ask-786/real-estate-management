import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as GlobalActions from './shared/store/actions';
import * as GlobalSelectors from './shared/store/selectors';
import { AppStateInterface } from './models/appState.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  isLoggedInSubscriber!: Subscription;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
  }
  title = 'Real-Estate-Management';

  ngOnInit() {
    let isLoggedIn;
    this.isLoggedInSubscriber = this.isLoggedIn$.subscribe({
      next: (data) => {
        isLoggedIn = data;
      },
    });

    if (isLoggedIn) {
      this.store.dispatch(GlobalActions.checkAuth());
    }
  }
  ngOnDestroy(): void {
    if (this.isLoggedInSubscriber) this.isLoggedInSubscriber.unsubscribe();
  }
}
