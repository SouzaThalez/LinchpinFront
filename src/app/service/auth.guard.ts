import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserLogedService } from './user-loged.service';

/** Bloqueia as rotas privadas para quem não fez login. */
export const authGuard: CanActivateFn = () => {
  const userLogedService = inject(UserLogedService);
  return userLogedService.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
