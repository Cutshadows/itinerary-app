// Angular 17+ functional interceptor
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BASE_API_URL } from '../guards/base-url.guard';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(BASE_API_URL);
  const isRelative = !/^https?:\/\//i.test(req.url);

  const modifiedReq = req.clone({
    url: isRelative ? baseUrl + req.url : req.url,
  });

  return next(modifiedReq);
};
