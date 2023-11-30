import { Router } from '@angular/router';
import { PropertyTypeInterface } from './model/property.model';
import { Store } from '@ngrx/store';
import { FilterOptionDialogComponent } from './components/filter-option-dialog/filter-option-dialog.component';
import { SortOptionDialogComponent } from './components/sort-option-dialog/sort-option-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { getFavoriteIds, searchProperties } from './store/actions';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  filterOptions!: PropertyTypeInterface;
  sortOption!: string;
  searchValue = '' as string;
  desc = false as boolean;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getFavoriteIds());
  }

  propertySearch(value: { search: string }) {
    this.searchValue = value.search;
    if (value.search.length >= 3 || value.search.length === 0) {
      this.store.dispatch(
        searchProperties({
          searchValue: value.search,
          sortValue: { value: this.sortOption, desc: this.desc },
          filterValue: this.filterOptions,
        })
      );
    }
  }

  openSortDialog() {
    const sortDialog = this.dialog.open(SortOptionDialogComponent);
    sortDialog
      .afterClosed()
      .subscribe((data: { sortOption: string; desc: boolean }) => {
        if (data) {
          this.sortOption = data.sortOption;
          this.desc = data.desc;

          let searchValue = '' as string;
          if (this.searchValue.length >= 3) {
            searchValue = this.searchValue;
          }

          this.store.dispatch(
            searchProperties({
              searchValue: searchValue,
              sortValue: { value: data.sortOption, desc: data.desc },
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
      if (data) {
        let searchValue = '' as string;
        if (this.searchValue.length >= 3) {
          if (this.searchValue.length >= 3) {
            searchValue = this.searchValue;
          }
        }
        this.store.dispatch(
          searchProperties({
            searchValue: searchValue,
            sortValue: { value: this.sortOption, desc: this.desc },
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
      return string.replace(/(\w)(\w*)/g, function (_, g1, g2) {
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
