import { CanActivateFn, Router} from "@angular/router";
import { AuthService } from "../services/api/AuthService";
import { LOGIN_ROUTE } from "../../shared/constants/ViewRoutesConstants";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([LOGIN_ROUTE], {
    queryParams: { returnUrl: state.url }
  });
};