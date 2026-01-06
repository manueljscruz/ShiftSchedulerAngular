import { HttpInterceptorFn } from '@angular/common/http';

export const AuthErrorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    // Here you can handle errors globally
    // For example, you can catch 401 Unauthorized errors and redirect to login
  );
};
