import { Router } from '@angular/router';
import { PropertyTypeInterface } from './model/property.model';
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
  filterOptions!: PropertyTypeInterface;
  sortOption!: string;
  searchValue = '' as string;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  propertySearch(value: { search: string }) {
    this.searchValue = value.search;
    if (value.search.length >= 3 || value.search.length === 0) {
      this.store.dispatch(
        PropertiesActions.searchProperties({
          searchValue: value.search,
          sortValue: this.sortOption,
          filterValue: this.filterOptions,
        })
      );
    }
  }

  openSortDialog() {
    const sortDialog = this.dialog.open(SortOptionDialogComponent);
    sortDialog.afterClosed().subscribe((data: { sortOption: string }) => {
      this.sortOption = data.sortOption;
      if (data && this.searchValue.length >= 3) {
        this.store.dispatch(
          PropertiesActions.searchProperties({
            searchValue: this.searchValue,
            sortValue: data.sortOption,
            filterValue: this.filterOptions,
          })
        );
      } else if (data) {
        this.store.dispatch(
          PropertiesActions.searchProperties({
            searchValue: '',
            sortValue: data.sortOption,
            filterValue: this.filterOptions,
          })
        );
      }
    });
  }

  openFilterDialog() {
    const filterDialog = this.dialog.open(FilterOptionDialogComponent);
    filterDialog.afterClosed().subscribe((data: PropertyTypeInterface) => {
      this.filterOptions = data;
      if (data && this.searchValue.length >= 3) {
        this.store.dispatch(
          PropertiesActions.searchProperties({
            searchValue: this.searchValue,
            sortValue: this.sortOption,
            filterValue: data,
          })
        );
      } else if (data) {
        this.store.dispatch(
          PropertiesActions.searchProperties({
            searchValue: '',
            sortValue: this.sortOption,
            filterValue: data,
          })
        );
      }
    });
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

  toPascalCase(string: string | undefined) {
    if (string)
      return string.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
      });
    else return '';
  }

  formatFilters(data: PropertyTypeInterface) {
    let formatted = '';
    for (const item in data) {
      if (data[item as keyof PropertyTypeInterface] === true) {
        formatted += ` ${this.toPascalCase(item)},`;
      }
    }
    return formatted.slice(0, -1);
  }
}
