import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { PropertyModelInterface } from '../../model/property.model';
import * as PropertiesActions from '../../store/actions';
import * as PropertiesSelectors from '../../store/selectors';
import * as GlobalActions from '../../../../shared/store/actions';

@Component({
  selector: 'app-fav-property',
  templateUrl: './fav-property.component.html',
  styleUrls: ['./fav-property.component.css'],
})
export class FavPropertyComponent implements OnInit {
  favProperties$: Observable<PropertyModelInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.favProperties$ = this.store.pipe(
      select(PropertiesSelectors.favPropertiesSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Favorites' }));
    this.store.dispatch(PropertiesActions.getFavorites());
  }

  getFavPropertyUrl(id: string) {
    return `${id}`;
  }
}
