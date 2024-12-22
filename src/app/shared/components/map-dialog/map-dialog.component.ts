import { CommonService } from './../../../components/common.service';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Map, LatLng, map, tileLayer, marker } from 'leaflet';
import { MapLocationsInterface } from 'src/app/models/mapLocations.interface';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf, NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-map-dialog',
    templateUrl: './map-dialog.component.html',
    styleUrls: ['./map-dialog.component.css'],
    imports: [CdkScrollable, MatDialogContent, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatInput, NgIf, NgFor, MatOption, MatDialogActions, MatButton, MatDialogClose]
})
export class MapDialogComponent implements OnInit {
  locations: MapLocationsInterface[] = [];
  myControl = new FormControl('');
  private map!: Map;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LatLng,
    private commonService: CommonService
  ) {}

  private initMap(): void {
    this.map = map('map', {
      center: [11.151477, 76.365746],
      zoom: 15,
      minZoom: 12,
      zoomControl: false,
      trackResize: true,
      keyboard: false,
      bounceAtZoomLimits: false,
    });

    const tiles = tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    this.map.on('click', (e) => {
      this.data = this.map.mouseEventToLatLng(e.originalEvent);
      marker(this.data).addTo(this.map).openPopup();
    });
  }

  getLocations(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if (query && query.length > 3) {
      this.commonService.getLocations(query).subscribe((data) => {
        this.locations = data;
      });
    } else if (query === '') {
      this.locations = [];
    }
  }

  onSelect(center: [number, number]) {
    this.map.flyTo([center[1], center[0]]);
    this.locations = [];
  }

  ngOnInit(): void {
    this.initMap();
  }
}
