import * as PropertiesSelectors from './store/selectors';
import { Observable, Subscription } from 'rxjs';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { PropertyModelInterface } from './model/property.model';
import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import * as PropertiesActions from './store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit, OnDestroy {
  properties$: Observable<PropertyModelInterface[]>;
  mostBottomReached$: Observable<boolean>;
  bottomReachedSubscription!: Subscription;

  moment = moment;

  constructor(private store: Store<AppStateInterface>) {
    this.properties$ = this.store.pipe(
      select(PropertiesSelectors.propertiesSelector)
    );
    this.mostBottomReached$ = this.store.pipe(
      select(PropertiesSelectors.mostBottomReachedSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(PropertiesActions.getProperties());
  }

  getPropertyUrl(id: string) {
    return `property/${id}`;
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    let isBottomReached;
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.bottomReachedSubscription = this.mostBottomReached$.subscribe({
        next: (bool: boolean) => {
          isBottomReached = bool;
        },
      });
      if (!isBottomReached) {
        setTimeout(() => {
          this.store.dispatch(PropertiesActions.getProperties());
        }, 200);
      }
    }
  }

  ngOnDestroy() {
    if (this.bottomReachedSubscription)
      this.bottomReachedSubscription.unsubscribe();
  }
}
