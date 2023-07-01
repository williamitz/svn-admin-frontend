import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const _cookieSvc = inject( CookieService );
const _router = inject( Router );

export const TokenGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): boolean => {

    const token = _cookieSvc.get('token');

    if( !token || token != '' ) {
      _router.navigateByUrl('/auth');
    }

    return true;
}