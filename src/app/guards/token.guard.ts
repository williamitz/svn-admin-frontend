import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../services/storage.service';

export const TokenGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): boolean => {

    const _st = inject( StorageService );
    const _router = inject( Router );

    const token = _st.getItem('token');

    if( !token || token == '' ) {
      _router.navigateByUrl('/auth');
    }

    return true;
}
