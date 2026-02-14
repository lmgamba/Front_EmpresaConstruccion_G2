import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLogged()) {
    return true;
  }

  // Si no está logueado, directo al login
  router.navigateByUrl('/login');
  return false;
};