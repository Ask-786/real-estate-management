import { changeReadStatus } from './../store/actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationsModelInterface } from '../model/notificaionModel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  getNotifications(): Observable<{
    notifications: NotificationsModelInterface[];
  }> {
    return this.http.get<{ notifications: NotificationsModelInterface[] }>(
      `${environment.baseUrl}/notifications`
    );
  }

  changeReadStatus(id: string) {
    return this.http.patch<{ status: boolean }>(
      `${environment.baseUrl}/notifications/${id}`,
      {}
    );
  }
}
