import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AppStateInterface } from '../models/appState.interface';
import * as GlobalSelectors from '../shared/store/selectors';

@Injectable()
export class ProtectLoginService implements CanActivate {
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private store: Store<AppStateInterface>) {
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
  }

  canActivate(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      map((isNotLoggedIn) => {
        if (isNotLoggedIn) {
          this.router.navigateByUrl('map');
        }
        return !isNotLoggedIn;
      })
    );
  }
}
