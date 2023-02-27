import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddPropertyInterface,
  PropertyModelInterface,
} from './model/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor(private http: HttpClient) {}

  getProperties(): Observable<PropertyModelInterface[]> {
    return this.http.get<PropertyModelInterface[]>(
      `${environment.baseUrl}/property`
    );
  }

  addProperty(data: Partial<AddPropertyInterface>) {
    return this.http.post<AddPropertyInterface>(
      `${environment.baseUrl}/property/add-property`,
      {
        title: data.title,
        price: data.price,
        description: data.description,
        tags: data.tags,
        coOrdinates: {
          lattitude: data.lattitude,
          longitude: data.longitude,
        },
        images: ['imageOne', 'imageTwo'],
        propertyType: data.propertyType,
        address: {
          country: data.country,
          state: data.state,
          district: data.district,
          city: data.city,
          streetAddress: data.streetAddress,
          zipCode: data.zipCode,
        },
      }
    );
  }

  getOneProperty(id: string) {
    return this.http.get(`${environment.baseUrl}/property/${id}`);
  }
}
