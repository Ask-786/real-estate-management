import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppStateInterface } from '../models/appState.interface';
import * as GlobalSelectors from '../shared/store/selectors';

@Injectable()
export class AuthGuardService implements CanActivate {
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private store: Store<AppStateInterface>) {
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
  }

  canActivate() {
    return this.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('auth/login');
        }
      })
    );
  }
}
