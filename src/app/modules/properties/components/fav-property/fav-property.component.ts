import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { PropertyModelInterface } from '../../model/property.model';
import * as moment from 'moment';
import * as PropertiesActions from '../../store/actions';
import * as PropertiesSelectors from '../../store/selectors';

@Component({
  selector: 'app-fav-property',
  templateUrl: './fav-property.component.html',
  styleUrls: ['./fav-property.component.css'],
})
export class FavPropertyComponent implements OnInit {
  favProperties$: Observable<PropertyModelInterface[]>;
  moment = moment;

  constructor(private store: Store<AppStateInterface>) {
    this.favProperties$ = this.store.pipe(
      select(PropertiesSelectors.favPropertiesSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(PropertiesActions.getFavorites());
  }

  getFavPropertyUrl(id: string) {
    return `${id}`;
  }
}
