import { EnquiryDiscussionInterface } from './../model/enquiryDiscussion.interfact';
import { environment } from '../../../../environments/environment';
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

  createEnquiry(data: CreateEnquiryFormInterface) {
    return this.http.post<{ createdEnquiry: EnquiryModelInterface }>(
      `${environment.baseUrl}/enquiry/create-enquiry`,
      data,
      httpOptions,
    );
  }

  getEnquiries() {
    return this.http.get<{
      enquiries: PropertyPopulatedEnquiryModelInterface[];
    }>(`${environment.baseUrl}/enquiry/get-enquiries`);
  }

  getUserEnquiries() {
    return this.http.get<{
      enquiries: PropertyPopulatedEnquiryModelInterface[];
    }>(`${environment.baseUrl}/enquiry/get-user-enquiries`);
  }

  getOneEnquiry(id: string) {
    return this.http.get<{
      enquiry: PropertyPopulatedEnquiryModelInterface;
      discussions: EnquiryDiscussionInterface[];
    }>(`${environment.baseUrl}/enquiry/enquiry/${id}`);
  }

  getDiscussions(enquiryId: string) {
    return this.http.get<{ discussions: EnquiryDiscussionInterface[] }>(
      `${environment.baseUrl}/enquiry/get-discussions/${enquiryId}`,
    );
  }
}
