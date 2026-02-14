import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // 1. ¿Está logueado?
  if (!authService.isLogged()) {
    router.navigateByUrl('/login');
    return false;
  }

  // 2. ¿Es un usuario/operario?
  const role = authService.getRole();
  
  if (role === 'user') {
    return true;
  }

  // 3. Redirección inteligente:
  // Si es un admin intentando entrar en zona de usuario, mándalo a su panel
  if (role === 'admin') {
    router.navigateByUrl('/manage-sites');
  } else {
    // Si el rol es desconocido, al login
    router.navigateByUrl('/login');
  }

  return false;
};