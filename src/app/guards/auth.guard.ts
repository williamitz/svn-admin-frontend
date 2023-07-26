import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {

    const _authSvc = inject( AuthService );
    const _st = inject( StorageService );
    const _router = inject( Router );

    let _token$: Subscription;

    return new Observable<boolean>( (obs) => {

      _authSvc.onAuthToken()
      .subscribe({
        next: (response) => {

          const { token } = response;

          _st.setItem( 'token', token );
          // console.log('response ::: ', response);

          obs.next( true );
          _token$?.unsubscribe();
        },
        error: (e) => {

          _st.onClearStorage();

          console.log('error ::: ', e);
          _router.navigateByUrl('/auth');
          obs.next( false );
          _token$?.unsubscribe();
        }
      });

    });

}
