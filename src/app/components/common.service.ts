import { Observable } from 'rxjs';
import { PropertyModelInterface } from './../modules/properties/model/property.model';
import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}
  getProperties(): Observable<PropertyModelInterface[]> {
    return this.http.get<PropertyModelInterface[]>(
      `${environment.baseUrl}/property`
    );
  }
}
