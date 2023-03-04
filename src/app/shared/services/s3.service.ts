import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    skip: 'true',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  constructor(private http: HttpClient) {}

  uploadImages(s3url: string, image: File) {
    return this.http.put(s3url, image, httpOptions);
  }
}
