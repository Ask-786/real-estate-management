import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  getFavoritesCount() {
    return this.http.get<{ count: number }>(
      `${environment.baseUrl}/favorites/get-count`
    );
  }
  getNotificationsCount() {
    return this.http.get<{ count: number }>(
      `${environment.baseUrl}/notifications/get-count`
    );
  }
}
