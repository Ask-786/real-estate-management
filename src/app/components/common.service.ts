import { MapLocationsInterface } from './../models/mapLocations.interface';
import { MapTilerResponseInterface } from './../models/mapTilerResponse.interface';
import { map } from 'rxjs';
import { PropertyModelInterface } from './../modules/properties/model/property.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    skip: 'true',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}
  getProperties() {
    return this.http.get<PropertyModelInterface[]>(
      `${environment.baseUrl}/property`,
    );
  }

  getLocations(query: string) {
    return this.http
      .get<MapTilerResponseInterface>(
        `https://api.maptiler.com/geocoding/${query}.json?key=${environment.mapTiler.apiKey}`,
        httpOptions,
      )
      .pipe(map((data) => data.features));
  }
}
