import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GoogleAuthService } from '../services/google-auth.service'; // adjust path if needed

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(GoogleAuthService);
  const router = inject(Router);

  if (!authService.isTokenExpired()) {
    return true;
  } else {
    localStorage.setItem('redirectAfterLogin', state.url); // Save intended URL
    return router.createUrlTree(['/login']);
  }
};