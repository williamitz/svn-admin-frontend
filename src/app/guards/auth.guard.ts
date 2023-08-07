import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';

// redux
import { Store } from '@ngrx/store';
import * as securityActions from '../redux/actions/segurity.actions';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {

    const _authSvc = inject( AuthService );
    const _st = inject( StorageService );
    const _store = inject( Store );
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
          _store.dispatch( securityActions.onClear() );

          console.log('error ::: ', e);
          _router.navigateByUrl('/auth');
          obs.next( false );
          _token$?.unsubscribe();
        }
      });

    });

}
