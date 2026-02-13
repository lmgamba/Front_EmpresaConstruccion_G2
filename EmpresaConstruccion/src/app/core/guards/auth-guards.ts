import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    // lo que permite o no que entre a las paginas es el token que hay en el localstorage
    const token = localStorage.getItem('token')
    // obtener usuario
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // si no hay token redirigir a login
    if (!token) {
        router.navigateByUrl('/login')
        return false
    }

    // si la ruta tiene un role, comprobar que el usuario tenga ese rol
    const verifyRole = route.data['role'];
    if (verifyRole && user.role !== verifyRole) {
        router.navigateByUrl('/login');
        return false
    }
    // si esta okay, permitir el acceso
    return true;
};
