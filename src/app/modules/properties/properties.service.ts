import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddPropertyInterface,
  PropertyModelInterface,
} from './model/property.model';
import { select, Store } from '@ngrx/store';
import * as PropertiesSelectors from './store/selectors';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  propertiesPage$: Observable<number>;
  constructor(
    private http: HttpClient,
    private store: Store<AppStateInterface>
  ) {
    this.propertiesPage$ = this.store.pipe(
      select(PropertiesSelectors.propertyPageSelector)
    );
  }

  getProperties(): Observable<PropertyModelInterface[]> {
    let propertiesePage;
    this.propertiesPage$.subscribe({
      next: (data: number) => {
        propertiesePage = data;
      },
    });
    return this.http.get<PropertyModelInterface[]>(
      `${environment.baseUrl}/property?page=${propertiesePage}`
    );
  }

  addProperty(data: AddPropertyInterface, images: string[]) {
    return this.http.post<PropertyModelInterface>(
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
        images,
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
    return this.http.get<PropertyModelInterface>(
      `${environment.baseUrl}/property/property/${id}`
    );
  }

  gets3UploadUrl(): Observable<{ uploadUrl: string }> {
    return this.http.get<{ uploadUrl: string }>(
      `${environment.baseUrl}/property/get-s3-upload-url`
    );
  }
}
