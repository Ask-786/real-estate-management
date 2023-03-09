import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CreateEnquiryFormInterface,
  EnquiryModelInterface,
} from './model/enquiryform.interface';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EnquiriesService {
  constructor(private http: HttpClient) {}

  createEnquiry(
    data: CreateEnquiryFormInterface
  ): Observable<{ createdEnquiry: EnquiryModelInterface }> {
    return this.http.post<{ createdEnquiry: EnquiryModelInterface }>(
      `${environment.baseUrl}/enquiry/create-enquiry`,
      data,
      httpOptions
    );
  }

  getEnquiries(): Observable<{ enquiries: EnquiryModelInterface[] }> {
    return this.http.get<{ enquiries: EnquiryModelInterface[] }>(
      `${environment.baseUrl}/enquiry/get-enquiries`
    );
  }
}
