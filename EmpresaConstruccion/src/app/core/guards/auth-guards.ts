import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    // lo que permite o no que entre a las pajinas es el token que hay en el localstorage
    const token = localStorage.getItem('token')
    const router = inject(Router);


    if (!token) {
        router.navigateByUrl('/login')
        return false
    }
    return true;
};
