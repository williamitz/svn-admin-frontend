import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const USER_KEY = 'currentUser';

@Injectable({providedIn: 'root'})
export class StorageService {

  private _cookiesvc = inject( CookieService );

  agencyId = '';

  private _isAdmin = false;

  get isAdmin() { return this._isAdmin; }
  set isAdmin( val: boolean ) { this._isAdmin = val; }

  public getUser(): any {
    // const user = this._cookiesvc.get(USER_KEY);
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  setItem( key: string, val: string ) {
    localStorage.setItem( key, val);
    // this._cookiesvc.set( key, val);
  }

  getItem( key: string ) {
    return localStorage.getItem( key);
    // return this._cookiesvc.get( key);
  }

  onClearStorage() {
    // this._cookiesvc.delete('token');
    // this._cookiesvc.delete('token');
    // this._cookiesvc.delete('token');
    // this._cookiesvc.deleteAll();

    localStorage.removeItem('token');
    localStorage.clear();
  }

}
