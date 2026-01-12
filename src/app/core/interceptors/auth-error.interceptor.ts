import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LOGIN_URL, REFRESH_TOKEN_URL } from '../../shared/constants/APIPathsConstants';
import { AuthService } from '../services/api/AuthService';
import { catchError, switchMap, throwError, EMPTY } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../../shared/constants/ViewRoutesConstants';

// Global flag to prevent multiple concurrent logout attempts
let isLoggingOut = false;

export const AuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Handle 401 Unauthorized
      if (error.status === 401) {

        // Don't try to refresh if this IS the refresh request or login request
        if (req.url.includes(REFRESH_TOKEN_URL) || req.url.includes(LOGIN_URL)) {
          // Refresh failed or login failed - logout ONCE
          if (!isLoggingOut) {
            isLoggingOut = true;
            console.log('Auth failed - logging out');

            // Clear state immediately to prevent further API calls
            authService.clearAuthState();

            // Navigate to login with replaceUrl to prevent back navigation
            router.navigate([LOGIN_ROUTE], { replaceUrl: true }).then(() => {
              isLoggingOut = false;
            });

            // Call logout endpoint in background (fire and forget)
            authService.logout().subscribe({
              error: (err) => console.error('Logout API call failed:', err),
              complete: () => isLoggingOut = false
            });
          }

          // Return EMPTY to stop the error chain and prevent retries
          return EMPTY;
        }

        // Try to refresh the token (only if not already logging out)
        if (isLoggingOut) {
          // Already logging out, don't retry
          return EMPTY;
        }

        return authService.refreshToken().pipe(
          switchMap(() => {
            // Token refreshed successfully - retry the original request
            console.log('Token refreshed, retrying request');
            return next(req);
          }),
          catchError((refreshError) => {
            // Refresh failed - logout user ONCE
            if (!isLoggingOut) {
              isLoggingOut = true;
              console.log('Refresh failed - logging out');

              // Clear state immediately
              authService.clearAuthState();

              // Navigate with replaceUrl to prevent back navigation
              router.navigate([LOGIN_ROUTE], { replaceUrl: true }).then(() => {
                isLoggingOut = false;
              });

              // Call logout endpoint in background
              authService.logout().subscribe({
                error: (err) => console.error('Logout API call failed:', err),
                complete: () => isLoggingOut = false
              });
            }

            // Return EMPTY to stop error propagation
            return EMPTY;
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
