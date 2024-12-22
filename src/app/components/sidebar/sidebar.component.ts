import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import {
  isLoadingSelector,
  isLoggedInSelector,
  favoritesCountSelector,
  notificationsCountSelector,
} from '../../shared/store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { AuthActions } from '../../modules/authentication/store/actions';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatDivider } from '@angular/material/divider';
import { NgIf, AsyncPipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    imports: [MatDrawerContainer, MatDrawer, ButtonComponent, RouterLink, MatIcon, MatBadge, MatDivider, NgIf, MatDrawerContent, NavbarComponent, RouterOutlet, AsyncPipe]
})
export class SidebarComponent implements OnDestroy, OnInit {
  screenWidth: boolean = window.innerWidth > 768;
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  subscriptions: Subscription[] = [];
  favoritesLength$: Observable<number>;
  notificatiosCount$: Observable<number>;

  constructor(
    private store: Store<AppStateInterface>,
    private authServices: AuthenticationService,
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.favoritesLength$ = this.store.pipe(select(favoritesCountSelector));
    this.notificatiosCount$ = this.store.pipe(
      select(notificationsCountSelector),
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.isLoggedIn$.subscribe((data) => {
        if (data) {
          this.store.dispatch(GlobalActions.getFavoritesCount());
          this.store.dispatch(GlobalActions.getNotificationsCount());
        }
      }),
    );
  }

  @HostListener('window:resize', ['event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth > 768;
  }

  onLogout() {
    this.authServices.removeToken();
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
