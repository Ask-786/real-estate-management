import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AddPropertyDialogComponent } from 'src/app/modules/properties/components/add-property-dialog/add-property-dialog.component';
import * as GlobalSelectors from '../../shared/store/selectors';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  @Output() toggleSide = new EventEmitter();
  isPropertiesRoute!: boolean;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isLoggedInSubscriber!: Subscription;

  title!: string;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppStateInterface>
  ) {
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
    this.isLoading$ = this.store.pipe(
      select(GlobalSelectors.isLoadingSelector)
    );
  }

  hasRoute(route: string[]) {
    return route.some((el) => el === this.router.url);
  }

  toggleSideBar() {
    this.toggleSide.emit();
  }
  addProperty() {
    this.isLoggedInSubscriber = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.dialog.open(AddPropertyDialogComponent);
      } else {
        this.router.navigateByUrl('auth/login');
      }
    });
  }

  ngOnDestroy() {
    if (this.isLoggedInSubscriber) this.isLoggedInSubscriber.unsubscribe();
  }
}
