import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // 1. Verificación  básica (Estar logueado)
  if (!authService.isLogged()) {
    router.navigateByUrl('/login');
    return false;
  }

  // 2. Verificación de privilegios
  if (authService.getRole() === 'admin') {
    return true;
  }

  // Si es un operario intentando entrar a zona admin, lo mandamos a su panel o home
  console.warn('Acceso denegado: Se requieren permisos de administrador');
  router.navigateByUrl('/dashboard'); // O la ruta principal del operario
  return false;
};