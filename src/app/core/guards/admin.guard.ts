import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/api/AuthService";
import { inject } from "@angular/core";
import { map, take } from "rxjs";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.waitForInitialization$().pipe(
    map(() => {
      const user = authService.getCurrentUser();
      if (authService.isAuthenticated() && user?.isAdmin) {
        return true;
      }
      return router.createUrlTree(['/admin/login']);
    }),
    take(1)
  );
};
