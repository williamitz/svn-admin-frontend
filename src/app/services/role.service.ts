import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { admin_service } from 'src/globals';
import { IRoleMenuResponse } from '../interfaces/role.interface';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoleService {

  private _http = inject( HttpClient );

  onGetMenus() {
    return this._http.get<IRoleMenuResponse>( admin_service + '/menu/create-role/all' )
    .pipe(

      map( (response) => {

        const { pathers, children } = response;

        const menusFinal = pathers.map( (e) => {
          const childrens = children.filter( (c) => c.patherMenuId == e.id );
          e.children = childrens;
          e.haveChildren = childrens.length > 0 ? true : false;

          return e;

        } );

        return { data: menusFinal };
      } )
    );
  }

}
