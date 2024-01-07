import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { PropertiesActions } from '../../store/actions';
import { ownPrpoertiesSelector } from '../../store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { PropertyModelInterface } from '../../model/property.model';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-own-properties',
  templateUrl: './own-properties.component.html',
  styleUrls: ['./own-properties.component.css'],
})
export class OwnPropertiesComponent implements OnInit {
  ownProperties$: Observable<PropertyModelInterface[]>;
  appRoutes = AppRoutes;

  constructor(private store: Store<AppStateInterface>) {
    this.ownProperties$ = this.store.pipe(select(ownPrpoertiesSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Your Properties' }));
    this.store.dispatch(PropertiesActions.getOwnProperties());
  }
}
