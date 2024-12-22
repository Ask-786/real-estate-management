import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { PropertiesActions } from '../../store/actions';
import { ownPrpoertiesSelector } from '../../store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { PropertyModelInterface } from '../../model/property.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PropertyComponent } from '../property/property.component';
import { MatCardImage } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-own-properties',
  templateUrl: './own-properties.component.html',
  styleUrls: ['./own-properties.component.css'],
  imports: [
    PropertyComponent,
    MatCardImage,
    MatButton,
    RouterLink,
    AsyncPipe,
    DatePipe,
  ],
})
export class OwnPropertiesComponent implements OnInit {
  ownProperties$: Observable<PropertyModelInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.ownProperties$ = this.store.pipe(select(ownPrpoertiesSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Your Properties' }));
    this.store.dispatch(PropertiesActions.getOwnProperties());
  }

  getOwnPropertyUrl(id: string) {
    return `${id}`;
  }
}
