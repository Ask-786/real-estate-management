import { Observable, Subscription } from 'rxjs';
import { MapDialogComponent } from './../../../../shared/components/map-dialog/map-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PropertyTypeEnum } from './../../model/property.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as PropertiesActions from '../../store/actions';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as PropertiesSelectors from '../../store/selectors';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.css'],
})
export class AddPropertyDialogComponent implements OnInit, OnDestroy {
  type!: PropertyTypeEnum;
  lattitude!: number;
  longitude!: number;
  propertyTypes: string[] = ['Land', 'Residential', 'Commercial', 'Industrial'];
  propertyData!: FormGroup;
  dialogRefSubscription!: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppStateInterface>,
    public dialogRef: MatDialogRef<AddPropertyDialogComponent>
  ) {
    this.isLoading$ = this.store.pipe(
      select(PropertiesSelectors.isLoadingSelector)
    );
  }

  openMap() {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      data: { lat: this.lattitude, lng: this.longitude },
    });

    this.dialogRefSubscription = dialogRef.afterClosed().subscribe({
      next: (data: L.LatLng) => {
        this.longitude = data?.lng;
        this.lattitude = data?.lat;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.propertyData = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      tags: new FormControl(null),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      lattitude: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required]),
      propertyType: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      streetAddress: new FormControl(null, [Validators.required]),
      zipCode: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.propertyData.invalid) {
      return;
    }
    this.store.dispatch(
      PropertiesActions.addProperty({ propertyData: this.propertyData.value })
    );
    this.dialogRef.close();
  }
  ngOnDestroy() {
    if (this.dialogRefSubscription) this.dialogRefSubscription.unsubscribe();
  }
}
