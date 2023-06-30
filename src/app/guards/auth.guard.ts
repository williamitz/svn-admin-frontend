import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const _authSvc = inject( AuthService );
const _cookieSvc = inject( CookieService );
const _router = inject( Router );

let _token$: Subscription;

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {

    return new Observable<boolean>( (obs) => {

      _authSvc.onAuthToken()
      .subscribe({
        next: (response) => {

          const { token } = response;

          _cookieSvc.set( 'token', token );
          console.log('response ::: ', response);

          obs.next( true );
          _token$?.unsubscribe();
        },
        error: (e) => {

          obs.next( false );
          _token$?.unsubscribe();
        }
      });

    });

    // return true;
}
