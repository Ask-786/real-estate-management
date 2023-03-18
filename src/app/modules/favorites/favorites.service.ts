import { PropertyModelInterface } from './../properties/model/property.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  favourProperty(id: string): Observable<{ result: unknown; message: string }> {
    return this.http.patch<{ result: unknown; message: string }>(
      `${environment.baseUrl}/favorites/add-to-favorites`,
      {
        propertyId: id,
      }
    );
  }

  getFavorites(): Observable<{ favoriteProperties: PropertyModelInterface[] }> {
    return this.http.get<{ favoriteProperties: PropertyModelInterface[] }>(
      `${environment.baseUrl}/favorites/get-favorites`
    );
  }
}
