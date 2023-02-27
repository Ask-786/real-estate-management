import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenizedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return next.handle(tokenizedRequest);
  }
}
