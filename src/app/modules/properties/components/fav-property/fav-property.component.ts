import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { PropertyModelInterface } from '../../model/property.model';
import { PropertiesActions } from '../../store/actions';
import { favPropertiesSelector } from '../../store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PropertyComponent } from '../property/property.component';
import { MatCardImage } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fav-property',
  templateUrl: './fav-property.component.html',
  styleUrls: ['./fav-property.component.css'],
  imports: [
    PropertyComponent,
    MatCardImage,
    MatButton,
    RouterLink,
    AsyncPipe,
    DatePipe,
  ],
})
export class FavPropertyComponent implements OnInit {
  favProperties$: Observable<PropertyModelInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.favProperties$ = this.store.pipe(select(favPropertiesSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Favorites' }));
    this.store.dispatch(PropertiesActions.getFavoriteIds());
  }

  getFavPropertyUrl(id: string) {
    return `${id}`;
  }
}
