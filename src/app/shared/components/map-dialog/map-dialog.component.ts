import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css'],
})
export class MapDialogComponent implements OnInit {
  private map!: L.Map;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: L.LatLng,
    public dialogRef: MatDialogRef<MapDialogComponent>
  ) {}

  private initMap(): void {
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

    tiles.addTo(this.map);

    this.map.on('click', (e) => {
      this.data = this.map.mouseEventToLatLng(e.originalEvent);
      L.marker(this.data).addTo(this.map).openPopup();
    });
  }

  ngOnInit(): void {
    this.initMap();
  }
}
