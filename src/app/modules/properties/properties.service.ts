import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertyModelInterface } from './model/property.model';

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
}
