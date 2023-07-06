import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IAuthResponse, IMenuUserResponse } from '../interfaces/auth.interface';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private _http = inject( HttpClient );

  onSingin( body: any ) {
    return this._http.post<IAuthResponse>( admin_service + '/auth/singin', body );
  }

  onAuthToken() {
    return this._http.get<IAuthResponse>( admin_service + '/auth/token' );
  }

  onFindMenu() {
    return this._http.get<IMenuUserResponse>( admin_service + '/auth/menu-by-role' )
    .pipe(

      map( (response) => {

        const { allows, ...rest } = response;

        const pathers = allows!.filter( (m) => !m.menu.patherMenuId );
        const newAllows = allows!.filter( (m) => m.menu.patherMenuId );

        const menuFinal = pathers.map<any>(
          (e) => {

            e.children = newAllows.filter( (m) => m.menu.patherMenuId == e.menu.id );

            return e;
          }

        );

        rest.allowMenu = menuFinal;

        return rest;

      } )

    )
  }

}
