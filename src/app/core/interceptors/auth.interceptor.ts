import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageServiceService } from '../services/language-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private languageService: LanguageServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the withCredentials flag and Accept-Language header to ALL requests
    const modifiedRequest = request.clone({
      withCredentials: true, // Browser will include cookies with the request
      setHeaders: {
        'Accept-Language': this.languageService.returnLocalization()
      }
    });

    return next.handle(modifiedRequest);
  }
}
