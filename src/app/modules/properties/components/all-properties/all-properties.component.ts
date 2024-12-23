import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
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
import {
  propertiesSelector,
  mostBottomReachedSelector,
  favoriteIdsSelector,
  propertyPageSelector,
} from '../../store/selectors';
import { isLoggedInSelector } from '../../../../shared/store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { PropertiesActions } from '../../store/actions';
import { AddPropertyDialogComponent } from '../add-property-dialog/add-property-dialog.component';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { PropertyComponent } from '../property/property.component';
import { MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.css'],
  imports: [
    MatButton,
    RouterLink,
    PropertyComponent,
    MatCardImage,
    MatIcon,
    AsyncPipe,
    DatePipe,
  ],
})
export class AllPropertiesComponent implements OnInit, OnDestroy {
  private store = inject<Store<AppStateInterface>>(Store);
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
    this.properties$ = this.store.pipe(select(propertiesSelector));
    this.mostBottomReached$ = this.store.pipe(
      select(mostBottomReachedSelector),
    );
    this.favoriteIds$ = this.store.pipe(select(favoriteIdsSelector));
    this.propertyPage$ = this.store.pipe(select(propertyPageSelector));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
