import * as moment from 'moment';
import { PropertyModelInterface } from './../properties/model/property.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as FavoritesSelectors from './store/selectors';
import * as FavoritesActions from './store/actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  properties$: Observable<PropertyModelInterface[]>;
  moment = moment;
  constructor(private store: Store<AppStateInterface>) {
    this.properties$ = this.store.pipe(
      select(FavoritesSelectors.favPropertiesSelector)
    );
  }

  getPropertyUrl(id: string) {
    return `fav-properties/${id}`;
  }

  ngOnInit(): void {
    this.store.dispatch(FavoritesActions.getFavorites());
  }
}
