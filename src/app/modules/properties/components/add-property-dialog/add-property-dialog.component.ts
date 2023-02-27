import { Router } from '@angular/router';
import { PropertiesService } from './../../properties.service';
import { MapDialogComponent } from './../../../../shared/components/map-dialog/map-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PropertyTypeEnum } from './../../model/property.model';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.css'],
})
export class AddPropertyDialogComponent {
  constructor(
    private dialog: MatDialog,
    private propertiesService: PropertiesService,
    private router: Router
  ) {}
  type!: PropertyTypeEnum;
  lattitude!: number;
  longitude!: number;
  propertyTypes: string[] = ['Land', 'Residential', 'Commercial', 'Industrial'];

  openMap() {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      data: { lat: this.lattitude, lng: this.longitude },
    });

    dialogRef.afterClosed().subscribe({
      next: (data: L.LatLng) => {
        this.longitude = data?.lng;
        this.lattitude = data?.lat;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  propertyData = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required]),
    tags: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    lattitude: new FormControl<number | null>(null, [Validators.required]),
    longitude: new FormControl<number | null>(null, [Validators.required]),
    propertyType: new FormControl<string | null>(null, [Validators.required]),
    country: new FormControl<string | null>(null, [Validators.required]),
    state: new FormControl<string | null>(null, [Validators.required]),
    district: new FormControl<string | null>(null, [Validators.required]),
    city: new FormControl<string | null>(null, [Validators.required]),
    streetAddress: new FormControl<string | null>(null, [Validators.required]),
    zipCode: new FormControl<number | null>(null, [Validators.required]),
  });

  onSubmit() {
    if (this.propertyData.invalid) {
      return;
    }
    this.propertiesService.addProperty(this.propertyData.value).subscribe({
      next: () => {
        this.router.navigateByUrl('properties');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
