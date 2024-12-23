import { PropertyTypeInterface } from './../model/property.model';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  AddPropertyInterface,
  PropertyModelInterface,
} from '../model/property.model';
import { select, Store } from '@ngrx/store';
import { propertyPageSelector } from '../store/selectors';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService implements OnDestroy {
  propertiesPage$: Observable<number>;
  subscriptions: Subscription[] = [];
  propertyPage!: number;

  constructor(
    private http: HttpClient,
    private store: Store<AppStateInterface>,
  ) {
    this.propertiesPage$ = this.store.pipe(select(propertyPageSelector));
    this.subscriptions.push(
      this.propertiesPage$.subscribe({
        next: (data: number) => {
          this.propertyPage = data;
        },
      }),
    );
  }

  getProperties(page: number) {
    console.log(page);
    return this.http.get<PropertyModelInterface[]>(
      `${environment.baseUrl}/property?page=${this.propertyPage}`,
    );
  }

  searchProperties(
    searchValue?: string,
    sortValue?: string,
    desc?: boolean,
    filterValue?: PropertyTypeInterface,
  ) {
    let filterOptions = '' as string;
    if (filterValue) {
      for (const index in filterValue) {
        if (filterValue[index as keyof PropertyTypeInterface] === true) {
          filterOptions += ` ${index}`;
        }
      }
    }

    return this.http.get<PropertyModelInterface[]>(
      `${environment.baseUrl}/property?page=${
        this.propertyPage
      }&searchValue=${searchValue}&sortValue=${sortValue}&desc=${desc}&filterValue=${filterOptions.trim()}`,
    );
  }

  addProperty(data: AddPropertyInterface) {
    return this.http.put<PropertyModelInterface>(
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
        images: data.images,
        propertyType: data.propertyType,
        address: {
          country: data.country,
          state: data.state,
          district: data.district,
          city: data.city,
          streetAddress: data.streetAddress,
          zipCode: data.zipCode,
        },
      },
    );
  }

  updateProperty(id: string, data: AddPropertyInterface, images?: string[]) {
    return this.http.put<PropertyModelInterface>(
      `${environment.baseUrl}/property/update-property`,
      {
        id,
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
      },
    );
  }

  getOneProperty(id: string) {
    return this.http.get<PropertyModelInterface>(
      `${environment.baseUrl}/property/property/${id}`,
    );
  }

  gets3UploadUrl() {
    return this.http.get<{ uploadUrl: string }>(
      `${environment.baseUrl}/property/get-s3-upload-url`,
    );
  }

  getOwnProperties() {
    return this.http.get<PropertyModelInterface[]>(
      `${environment.baseUrl}/property/get-own-properties`,
    );
  }

  deleteProperty(id: string) {
    return this.http.delete<{ deletedpropertyid: string }>(
      `${environment.baseUrl}/property/property/${id}`,
    );
  }

  favourProperty(id: string) {
    return this.http.patch<{ result: unknown; message: string; id: string }>(
      `${environment.baseUrl}/favorites/add-to-favorites`,
      {
        propertyId: id,
      },
    );
  }

  unFavourProperty(id: string) {
    return this.http.patch<{ result: unknown; message: string; id: string }>(
      `${environment.baseUrl}/favorites/remove-from-favorites`,
      {
        propertyId: id,
      },
    );
  }

  getFavorites() {
    return this.http.get<{ favoriteProperties: PropertyModelInterface[] }>(
      `${environment.baseUrl}/favorites/get-favorites`,
    );
  }

  getFavoriteIds() {
    return this.http.get<{ user: string; favoriteProperties: string[] }>(
      `${environment.baseUrl}/favorites/get-favorite-ids`,
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
