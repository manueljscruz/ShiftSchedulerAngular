import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the withCredentials flag to ALL requests
    const modifiedRequest = request.clone({
      withCredentials: true // Browser will include cookies with the request
    });
    
    return next.handle(modifiedRequest);
  }
}
