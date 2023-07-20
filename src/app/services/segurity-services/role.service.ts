import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { admin_service } from 'src/globals';
import { IRoleByIDResponse, IRoleMenuResponse, IRoleResponse } from '../../interfaces/segurity-interfaces/role.interface';
import { map } from 'rxjs';
import { IPagerFilter } from '../../interfaces/pager.interface';

@Injectable({providedIn: 'root'})
export class RoleService {

  private _http = inject( HttpClient );

  onGetMenus() {
    return this._http.get<IRoleMenuResponse>( admin_service + '/menu/create-role/all' )
    .pipe(

      map( (response) => {

        const { pathers, children } = response;

        const menusFinal = pathers.map( (e) => {

          const childrens = children.filter( (c) => c.patherMenuId == e.id )
                                    .map( (a) => {
                                      let { actions, ...rest } = a;
                                      a.selected = false;

                                      return { ...rest, actions: actions.map( (rec) => { return { selected: false, action: rec } } ) }
                                     } );


          e.children = childrens as any;
          e.haveChildren = childrens.length > 0 ? true : false;
          e.selected = false;

          console.log('e.actions ::: ', e.actions);
          e.actions = e.actions?.map( (a) => { return { selected: false, action: a } } ) ?? [];

          return e;

        } );

        return { data: menusFinal };
      } )
    );
  }

  onFindAll( filter?: IPagerFilter, page = 1 ) {

    let params = `page=${ page }`;
    params += `&filter=${ filter?.filter ?? '' }`;
    params += `&active=${ !filter?.active }`;
    params += `&order=${ filter?.order }`;

    return this._http.get<IRoleResponse>( admin_service + '/role?' + params );
  }

  onFindById( id: string ) {
    return this._http.get<IRoleByIDResponse>( admin_service + `/role/${ id }` );
  }

  onCreate( body: any ) {
    return this._http.post( admin_service + '/role', body );
  }

  onUpdate( id: string, body: any ) {
    return this._http.put( admin_service + `/role/${ id }`, body );
  }

  onDelete( id: string ) {
    return this._http.delete( admin_service + `/role/${ id }` );
  }

}
