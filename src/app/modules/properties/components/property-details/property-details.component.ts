import { AppStateInterface } from './../../../../models/appState.interface';
import { PropertyModelInterface } from './../../model/property.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as PropertiesActions from '../../store/actions';
import * as PropertieseSelectors from '../../store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  propertyId!: string;
  property$!: Observable<PropertyModelInterface | null>;

  constructor(
    private store: Store<AppStateInterface>,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.propertyId = params['id'];
    });
    this.property$ = this.store.pipe(
      select(PropertieseSelectors.selectedPropertySelector)
    );
  }

  ngOnInit() {
    this.store.dispatch(
      PropertiesActions.getOneProperty({ propertyId: this.propertyId })
    );
  }
}
