import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertyModelInterface } from './../../model/property.model';
import { Observable, Subscription } from 'rxjs';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as PropertiesSelectors from '../../store/selectors';
import * as GlobalSelectors from '../../../../shared/store/selectors';
import * as GlobalActions from '../../../../shared/store/actions';
import * as PropertiesActions from '../../store/actions';
import { AddPropertyDialogComponent } from '../add-property-dialog/add-property-dialog.component';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.css'],
})
export class AllPropertiesComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppStateInterface>);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  properties$: Observable<PropertyModelInterface[]>;
  mostBottomReached$: Observable<boolean>;
  favoriteIds$: Observable<string[]>;
  propertyPage$: Observable<number>;
  isLoggedIn$: Observable<boolean>;
  subscriptions: Subscription[] = [];
  isLoggedIn: boolean | undefined;
  bottomReached: boolean | undefined;
  propertyPage = 0;

  constructor() {
    this.properties$ = this.store.pipe(
      select(PropertiesSelectors.propertiesSelector),
    );
    this.mostBottomReached$ = this.store.pipe(
      select(PropertiesSelectors.mostBottomReachedSelector),
    );
    this.favoriteIds$ = this.store.pipe(
      select(PropertiesSelectors.favoriteIdsSelector),
    );
    this.propertyPage$ = this.store.pipe(
      select(PropertiesSelectors.propertyPageSelector),
    );
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector),
    );
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Properties' }));
    this.subscriptions.push(
      this.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }),
      this.mostBottomReached$.subscribe({
        next: (data) => {
          this.bottomReached = data;
        },
      }),
      this.propertyPage$.subscribe((data) => {
        this.propertyPage = data;
      }),
    );
    if (!this.bottomReached) {
      this.store.dispatch(
        PropertiesActions.getProperties({ page: this.propertyPage }),
      );
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    if (
      (event.target as HTMLBodyElement).offsetHeight +
        (event.target as HTMLBodyElement).scrollTop >=
      (event.target as HTMLBodyElement).scrollHeight - 1
    ) {
      if (!this.bottomReached) {
        setTimeout(() => {
          this.store.dispatch(
            PropertiesActions.getProperties({ page: this.propertyPage }),
          );
        }, 200);
      }
    }
  }

  addProperty() {
    if (this.isLoggedIn) {
      this.dialog.open(AddPropertyDialogComponent, {
        disableClose: true,
      });
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
