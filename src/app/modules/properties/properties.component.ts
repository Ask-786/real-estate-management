import { Store } from '@ngrx/store';
import { FilterOptionDialogComponent } from './components/filter-option-dialog/filter-option-dialog.component';
import { SortOptionDialogComponent } from './components/sort-option-dialog/sort-option-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import * as PropertiesActions from './store/actions';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent {
  constructor(private dialog: MatDialog, private store: Store) {}

  propertySearch(value: { search: string }) {
    this.store.dispatch(
      PropertiesActions.searchProperties({ searchValue: value.search })
    );
  }

  openSortDialog() {
    this.dialog.open(SortOptionDialogComponent);
  }

  openFilterDialog() {
    this.dialog.open(FilterOptionDialogComponent);
  }
}
