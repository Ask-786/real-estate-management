import { PropertyModelInterface } from './../../model/property.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MapLocationsInterface } from 'src/app/models/mapLocations.interface';
import * as L from 'leaflet';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
  locations: MapLocationsInterface[] = [];
  private map!: L.Map;
  @Input() latlng!: Observable<PropertyModelInterface | null>;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.latlng.subscribe((data) => {
        if (data) {
          if (this.map) {
            this.map.remove();
          }
          this.initMap(data);
        }
      })
    );
  }

  private initMap(data: PropertyModelInterface): void {
    this.map = L.map('map', {
      center: [data.coOrdinates.lattitude, data.coOrdinates.longitude],
      zoom: 15,
      minZoom: 12,
      zoomControl: false,
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

    const icon = (propertyType: string) => {
      return L.icon({
        iconUrl: `../../../assets//images/markers/marker-${propertyType}.svg`,
        iconSize: [35, 35],
      });
    };

    L.marker([data.coOrdinates.lattitude, data.coOrdinates.longitude], {
      icon: icon(data.propertyType),
    })
      .addTo(this.map)
      .bindPopup(data.title)
      .openPopup();

    tiles.addTo(this.map);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
