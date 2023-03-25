import { FormControl } from '@angular/forms';
import {
  MapLocationsInterface,
  GeomertryInterface,
} from './../../models/mapLocations.interface';
import { PropertyModelInterface } from './../../modules/properties/model/property.model';
import { CommonService } from './../common.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as L from 'leaflet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, OnDestroy {
  locations: MapLocationsInterface[] = [];
  myControl = new FormControl('');
  private map!: L.Map;
  propertySubscription!: Subscription;

  constructor(private commonService: CommonService) {}

  private initMap(properties: PropertyModelInterface[]): void {
    this.map = L.map('map', {
      center: [11.151477, 76.365746],
      zoom: 15,
      zoomControl: true,
      trackResize: true,
      keyboard: false,
      bounceAtZoomLimits: false,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    if (properties.length > 0) {
      const icon = (propertyType: string) => {
        return L.icon({
          iconUrl: `../../../assets//images/markers/marker-${propertyType}.svg`,
          iconSize: [35, 35],
        });
      };

      properties.forEach((p) => {
        L.marker([p.coOrdinates.lattitude, p.coOrdinates.longitude], {
          icon: icon(p.propertyType),
        })
          .addTo(this.map)
          .bindPopup(p.title)
          .openPopup();
        tiles.addTo(this.map);
      });
    }
  }

  ngOnInit(): void {
    this.propertySubscription = this.commonService
      .getProperties()
      .subscribe((properties) => {
        this.initMap(properties);
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

  ngOnDestroy() {
    if (this.propertySubscription) this.propertySubscription.unsubscribe();
  }
}
