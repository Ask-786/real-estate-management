import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertyModelInterface } from './../../model/property.model';
import { Observable, Subscription } from 'rxjs';
import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as moment from 'moment';
import * as PropertiesSelectors from '../../store/selectors';
import * as GlobalSelectors from '../../../../shared/store/selectors';
import * as GlobalActions from '../../../../shared/store/actions';
import * as PropertiesActions from '../../store/actions';
import { AddPropertyDialogComponent } from '../add-property-dialog/add-property-dialog.component';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.css'],
})
export class AllPropertiesComponent implements OnInit {
  properties$: Observable<PropertyModelInterface[]>;
  mostBottomReached$: Observable<boolean>;
  favoriteIds$: Observable<string[]>;
  propertyPage$: Observable<number>;
  isLoggedIn$: Observable<boolean>;
  isLoggedInSubscription!: Subscription;
  isLoggedIn!: boolean;
  bottomReached!: boolean;
  bottomReachedSubscription!: Subscription;
  propertyPageSubscription!: Subscription;
  propertyPage!: number;

  moment = moment;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.properties$ = this.store.pipe(
      select(PropertiesSelectors.propertiesSelector)
    );
    this.mostBottomReached$ = this.store.pipe(
      select(PropertiesSelectors.mostBottomReachedSelector)
    );
    this.favoriteIds$ = this.store.pipe(
      select(PropertiesSelectors.favoriteIdsSelector)
    );
    this.propertyPage$ = this.store.pipe(
      select(PropertiesSelectors.propertyPageSelector)
    );
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Properties' }));
    this.isLoggedInSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.bottomReachedSubscription = this.mostBottomReached$.subscribe({
      next: (data) => {
        this.bottomReached = data;
      },
    });
    this.propertyPageSubscription = this.propertyPage$.subscribe((data) => {
      this.propertyPage = data;
    });
    if (!this.bottomReached) {
      this.store.dispatch(
        PropertiesActions.getProperties({ page: this.propertyPage })
      );
      this.store.dispatch(PropertiesActions.getFavoriteIds());
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    console.log('hello');
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight - 1
    ) {
      if (!this.bottomReached) {
        setTimeout(() => {
          this.store.dispatch(
            PropertiesActions.getProperties({ page: this.propertyPage })
          );
        }, 200);
      }
    }
  }

  addProperty() {
    if (this.isLoggedIn) {
      this.dialog.open(AddPropertyDialogComponent);
    } else {
      this.router.navigateByUrl('auth/login');
    }
  }

  hasRoute(route: string[]) {
    return route.some((el) => el === this.router.url);
  }

  getPropertyUrl(id: string) {
    return `property/${id}`;
  }
}
