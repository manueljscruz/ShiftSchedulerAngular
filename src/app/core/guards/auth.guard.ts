import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/api/AuthService";
import { LOGIN_ROUTE } from "../../shared/constants/ViewRoutesConstants";
import { inject } from "@angular/core";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for initialization, then check auth state
  return authService.waitForInitialization$().pipe(
    map(() => {
      // Initialization complete - now check auth state
      if (authService.isAuthenticated()) {
        return true;
      }

      // Not authenticated - redirect to login
      return router.createUrlTree([LOGIN_ROUTE], {
        queryParams: { returnUrl: state.url }
      });
    }),
    take(1) // Complete after first emission
  );
};