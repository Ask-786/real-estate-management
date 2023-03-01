import { MatDialog } from '@angular/material/dialog';
import * as PropertiesSelectors from './store/selectors';
import { fromEvent, Observable } from 'rxjs';
import { Component, HostListener, OnInit } from '@angular/core';
import { PropertyModelInterface } from './model/property.model';
import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import * as PropertiesActions from './store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { AddPropertyDialogComponent } from './components/add-property-dialog/add-property-dialog.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties$: Observable<PropertyModelInterface[]>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  moment = moment;

  constructor(
    private store: Store<AppStateInterface>,
    private dialog: MatDialog
  ) {
    this.isLoading$ = this.store.pipe(
      select(PropertiesSelectors.isLoadingSelector)
    );
    this.properties$ = this.store.pipe(
      select(PropertiesSelectors.propertiesSelector)
    );
    this.error$ = this.store.pipe(select(PropertiesSelectors.errorSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(PropertiesActions.getProperties());
  }

  getPropertyUrl(id: string) {
    return `property/${id}`;
  }
  addProperty() {
    this.dialog.open(AddPropertyDialogComponent);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight - 1
    ) {
      setTimeout(() => {
        this.store.dispatch(PropertiesActions.getProperties());
      }, 200);
    }
  }
}
