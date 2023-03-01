import { PropertyModelInterface } from './../../model/property.model';
import { PropertyStateInterface } from './../../model/propertyState.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PropertiesActions from '../../store/actions';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  propertyId!: string;
  property!: PropertyModelInterface;
  constructor(
    private store: Store<PropertyStateInterface>,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.propertyId = params['id'];
    });
  }
  ngOnInit() {
    this.store.dispatch(
      PropertiesActions.getOneProperty({ propertyId: this.propertyId })
    );
  }
}
