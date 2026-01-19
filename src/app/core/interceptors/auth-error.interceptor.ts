import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LOGIN_URL, REFRESH_TOKEN_URL, LOGOUT_URL } from '../../shared/constants/APIPathsConstants';
import { AuthService } from '../services/api/AuthService';
import { catchError, switchMap, throwError, EMPTY, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../../shared/constants/ViewRoutesConstants';

// Global flags to prevent multiple concurrent operations
let isLoggingOut = false;
let isRefreshing = false;
let refreshTokenSubject: Observable<any> | null = null;

export const AuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Add withCredentials to ALL requests (merged from AuthInterceptor)
  const requestWithCredentials = req.clone({
    withCredentials: true
  });

  return next(requestWithCredentials).pipe(
    catchError((error: HttpErrorResponse) => {

      // Handle 401 Unauthorized
      if (error.status === 401) {

        // Don't try to refresh if this IS the refresh/login/logout request
        if (req.url.includes(REFRESH_TOKEN_URL) || req.url.includes(LOGIN_URL) || req.url.includes(LOGOUT_URL)) {
          // Auth operation failed - logout ONCE
          if (!isLoggingOut) {
            isLoggingOut = true;
            console.log('Auth failed - clearing state and redirecting');

            // Clear state immediately to prevent further API calls
            authService.clearAuthState();

            // Navigate to login with replaceUrl to prevent back navigation
            router.navigate([LOGIN_ROUTE], { replaceUrl: true }).then(() => {
              isLoggingOut = false;
            });

            // DO NOT call logout() HTTP endpoint - auth is already invalid
            // Making an HTTP call here would trigger this interceptor again
          }

          // Return EMPTY to stop the error chain and prevent retries
          return EMPTY;
        }

        // Try to refresh the token (only if not already logging out or refreshing)
        if (isLoggingOut) {
          // Already logging out, don't retry
          return EMPTY;
        }

        // If already refreshing, wait for that refresh to complete
        if (isRefreshing && refreshTokenSubject) {
          console.log('Token refresh already in progress, waiting...');
          return refreshTokenSubject.pipe(
            switchMap(() => {
              // Refresh completed, retry the original request with new credentials
              const clonedReq = requestWithCredentials.clone();
              return next(clonedReq);
            }),
            catchError(() => EMPTY)
          );
        }

        // Start the refresh process
        isRefreshing = true;
        refreshTokenSubject = authService.refreshToken().pipe(
          switchMap(() => {
            // Token refreshed successfully - clone and retry the original request
            // This ensures the request uses the new cookies set by the refresh
            console.log('Token refreshed successfully');
            isRefreshing = false;
            refreshTokenSubject = null;

            const clonedReq = requestWithCredentials.clone();
            return next(clonedReq);
          }),
          catchError((refreshError) => {
            // Refresh failed - logout user ONCE
            isRefreshing = false;
            refreshTokenSubject = null;

            if (!isLoggingOut) {
              isLoggingOut = true;
              console.log('Refresh failed - clearing state and redirecting');

              // Clear state immediately
              authService.clearAuthState();

              // Navigate with replaceUrl to prevent back navigation
              router.navigate([LOGIN_ROUTE], { replaceUrl: true }).then(() => {
                isLoggingOut = false;
              });

              // DO NOT call logout() HTTP endpoint - would create infinite loop
              // Cookies are already invalid, making an HTTP call would fail with 401
            }

            // Return EMPTY to stop error propagation
            return EMPTY;
          })
        );

        return refreshTokenSubject;
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
