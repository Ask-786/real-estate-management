import { Observable, Subscription, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as GlobalSelectors from '../../shared/store/selectors';
import * as GlobalActions from '../../shared/store/actions';
import * as AuthenticationActions from '../../modules/authentication/store/actions';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnDestroy, OnInit {
  screenWidth: boolean = window.innerWidth > 768;
  isLoading$: Observable<boolean>;
  isLoadingSubscription!: Subscription;
  isLoggedIn$: Observable<boolean>;
  isLoggedInSubscription!: Subscription;
  favoritesLength$: Observable<number>;

  constructor(
    private store: Store<AppStateInterface>,
    private authServices: AuthenticationService
  ) {
    this.isLoading$ = this.store.pipe(
      select(GlobalSelectors.isLoadingSelector)
    );
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
    this.favoritesLength$ = this.store.pipe(
      select(GlobalSelectors.favoritesCountSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.getFavoritesCount());
  }

  @HostListener('window:resize', ['event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth > 768;
  }

  onLogout() {
    this.authServices.removeToken();
    this.store.dispatch(AuthenticationActions.logout());
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription) this.isLoadingSubscription.unsubscribe();
    if (this.isLoggedInSubscription) this.isLoggedInSubscription.unsubscribe();
  }
}
