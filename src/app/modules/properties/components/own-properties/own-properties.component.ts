import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as moment from 'moment';
import * as PropertiesActions from '../../store/actions';
import * as PropertiesSelectors from '../../store/selectors';
import * as GlobalActions from '../../../../shared/store/actions';
import { PropertyModelInterface } from '../../model/property.model';

@Component({
  selector: 'app-own-properties',
  templateUrl: './own-properties.component.html',
  styleUrls: ['./own-properties.component.css'],
})
export class OwnPropertiesComponent implements OnInit {
  moment = moment;
  ownProperties$: Observable<PropertyModelInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.ownProperties$ = this.store.pipe(
      select(PropertiesSelectors.ownPrpoertiesSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Your Properties' }));
    this.store.dispatch(PropertiesActions.getOwnProperties());
  }

  getOwnPropertyUrl(id: string) {
    return `${id}`;
  }
}
