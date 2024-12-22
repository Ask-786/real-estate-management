import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const skip = request.headers.get('skip');
  if (skip) {
    request = request.clone({
      headers: request.headers.delete('skip'),
    });
    return next(request);
  }
  const tokenizedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return next(tokenizedRequest);
};
