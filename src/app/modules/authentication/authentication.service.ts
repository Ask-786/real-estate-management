import { Injectable } from '@angular/core';
import { tap, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginForm, SignUpForm } from './models/authentication.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_NAME = 'access_token';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(true);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  userLogin(
    userData: Partial<LoginForm>
  ): Observable<{ status: boolean; access_token: string }> {
    return this.http
      .post<{ status: boolean; access_token: string }>(
        `${environment.baseUrl}/auth/login`,
        userData,
        httpOptions
      )
      .pipe(
        tap((response: { status: boolean; access_token: string }) => {
          if (response.status) {
            localStorage.setItem(this.TOKEN_NAME, response.access_token);
          }
        })
      );
  }

  registerUser(userData: Partial<SignUpForm>) {
    return this.http.post(
      `${environment.baseUrl}/auth/signup`,
      userData,
      httpOptions
    );
  }
}
