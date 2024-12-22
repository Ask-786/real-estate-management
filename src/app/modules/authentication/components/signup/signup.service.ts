import { SignUpForm } from './../../models/authentication.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class SignupService {
  constructor(private http: HttpClient) {}

  registerUser(userData: Partial<SignUpForm>) {
    return this.http.post(
      `${environment.baseUrl}/auth/signup`,
      userData,
      httpOptions,
    );
  }
}
