import { HttpInterceptorFn } from '@angular/common/http';

export const CredentialsInterceptor: HttpInterceptorFn = (req, next) => {

  let modifiedReq = req.clone({
    withCredentials: true
  });

  return next(modifiedReq);
};
