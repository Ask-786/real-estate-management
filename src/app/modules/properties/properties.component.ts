import { Observable, Subscription } from 'rxjs';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { PropertyModelInterface } from './model/property.model';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as PropertiesActions from './store/actions';
import * as moment from 'moment';
import * as PropertiesSelectors from './store/selectors';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit, OnDestroy {
  properties$: Observable<PropertyModelInterface[]>;
  mostBottomReached$: Observable<boolean>;
  bottomReachedSubscription!: Subscription;
  bottomReached!: boolean;
  favoriteIds$: Observable<string[]>;
  propertyPage$: Observable<number>;
  propertyPage!: number;
  propertyPageSubscription!: Subscription;

  moment = moment;

  constructor(private store: Store<AppStateInterface>) {
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
  }

  ngOnInit(): void {
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

  getPropertyUrl(id: string) {
    return `property/${id}`;
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
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

  ngOnDestroy() {
    if (this.bottomReachedSubscription)
      this.bottomReachedSubscription.unsubscribe();
  }
}
