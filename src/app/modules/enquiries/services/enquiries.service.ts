import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CreateEnquiryFormInterface,
  EnquiryModelInterface,
  PropertyPopulatedEnquiryModelInterface,
} from '../model/enquiryform.interface';
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

  getEnquiries(): Observable<{
    enquiries: PropertyPopulatedEnquiryModelInterface[];
  }> {
    return this.http.get<{
      enquiries: PropertyPopulatedEnquiryModelInterface[];
    }>(`${environment.baseUrl}/enquiry/get-enquiries`);
  }

  getOneEnquiry(
    id: string
  ): Observable<{ enquiry: PropertyPopulatedEnquiryModelInterface }> {
    return this.http.get<{ enquiry: PropertyPopulatedEnquiryModelInterface }>(
      `${environment.baseUrl}/enquiry/enquiry/${id}`
    );
  }
}
