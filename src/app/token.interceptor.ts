import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const skip = request.headers.get('skip');
    if (skip) {
      request = request.clone({
        headers: request.headers.delete('skip'),
      });
    }
    const tokenizedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return next.handle(skip ? request : tokenizedRequest);
  }
}
