import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModelInterface } from 'src/app/shared/models/user.interface';
import { LoginForm, SignUpForm } from '../models/authentication.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface loginRequestModelInterface {
  status: boolean;
  access_token: string;
  user: UserModelInterface;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_NAME = 'access_token';

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  userLogin(userData: LoginForm) {
    return this.http
      .post<loginRequestModelInterface>(
        `${environment.baseUrl}/auth/login`,
        userData,
        httpOptions,
      )
      .pipe(
        tap((response: loginRequestModelInterface) => {
          if (response.status) {
            localStorage.setItem(this.TOKEN_NAME, response.access_token);
          }
        }),
      );
  }

  registerUser(userData: SignUpForm) {
    return this.http.post<{
      status: boolean;
      message: string;
      user: UserModelInterface;
    }>(`${environment.baseUrl}/auth/signup`, userData, httpOptions);
  }

  checkAuth() {
    return this.http.get<{ user: UserModelInterface; token: string }>(
      `${environment.baseUrl}/auth/check-auth`,
    );
  }
}
