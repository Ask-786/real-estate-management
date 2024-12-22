import { Store } from '@ngrx/store';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MapLocationsInterface } from './../../models/mapLocations.interface';
import { PropertyModelInterface } from './../../modules/properties/model/property.model';
import { CommonService } from './../common.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalActions } from 'src/app/shared/store/actions';
import { Map, map, tileLayer, icon as icon_1, marker } from 'leaflet';
import { Subscription } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf, NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    NgIf,
    NgFor,
    MatOption,
  ],
})
export class MapViewComponent implements OnInit, OnDestroy {
  locations: MapLocationsInterface[] = [];
  myControl = new FormControl('');
  private map!: Map;
  subscriptions: Subscription[] = [];

  constructor(
    private commonService: CommonService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Map' }));
    this.subscriptions.push(
      this.commonService.getProperties().subscribe((properties) => {
        this.initMap(properties);
      }),
    );
  }

  private initMap(properties: PropertyModelInterface[]): void {
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
      },
    );

    const icon = (propertyType: string) => {
      return icon_1({
        iconUrl: `assets/images/markers/marker-${propertyType}.svg`,
        iconSize: [35, 35],
      });
    };

    properties.forEach((p) => {
      marker([p.coOrdinates.lattitude, p.coOrdinates.longitude], {
        icon: icon(p.propertyType),
      })
        .addTo(this.map)
        .bindPopup(p.title)
        .openPopup();
    });

    tiles.addTo(this.map);
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

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
