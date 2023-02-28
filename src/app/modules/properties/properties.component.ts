import { isLoadingSelector } from './store/selectors';
import { AddPropertyDialogComponent } from './components/add-property-dialog/add-property-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PropertiesService } from './properties.service';
import { Component, OnInit } from '@angular/core';
import { PropertyModelInterface } from './model/property.model';
import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import * as PropertiesActions from './store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties$!: Observable<PropertyModelInterface[]>;
  moment = moment;
  isLoading$: Observable<boolean>;

  constructor(
    private propertiesService: PropertiesService,
    private dialog: MatDialog,
    private store: Store<AppStateInterface>
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }
  ngOnInit(): void {
    this.store.dispatch(PropertiesActions.getProperties());
    this.properties$ = this.propertiesService.getProperties();
  }

  addProperty() {
    this.dialog.open(AddPropertyDialogComponent);
  }

  getPropertyUrl(id: string) {
    return `property/${id}`;
  }
}
