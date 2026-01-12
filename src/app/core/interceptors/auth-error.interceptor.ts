import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LOGIN_URL, REFRESH_TOKEN_URL } from '../../shared/constants/APIPathsConstants';
import { AuthService } from '../services/api/AuthService';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../../shared/constants/ViewRoutesConstants';



export const AuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // Handle 401 Unauthorized
      if (error.status === 401) {
        
        // Don't try to refresh if this IS the refresh request
        if (req.url.includes(REFRESH_TOKEN_URL) || req.url.includes(LOGIN_URL)) {
          // Refresh failed or login failed - logout
          authService.logout().subscribe(() => {
            router.navigate([LOGIN_ROUTE]);
          });
          return throwError(() => error);
        }

        // Try to refresh the token
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Token refreshed successfully - retry the original request
            console.log('Token refreshed, retrying request');
            return next(req);
          }),
          catchError((refreshError) => {
            // Refresh failed - logout user
            console.log('Refresh failed - logging out');
            authService.logout().subscribe(() => {
              router.navigate([LOGIN_ROUTE]);
            });
            return throwError(() => refreshError);
          })
        );
      }

      // Handle 403 Forbidden
      if (error.status === 403) {
        console.log('Forbidden - insufficient permissions');
        router.navigate([DASHBOARD_ROUTE]);
      }

      // Handle other errors
      return throwError(() => error);
    })
  );
};
