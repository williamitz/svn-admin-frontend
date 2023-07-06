import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IPagerFilter } from '../interfaces/pager.interface';
import { IUserByIdResponse, IUserListResponse } from '../interfaces/user.interface';

const entity = '/user';

@Injectable({providedIn: 'root'})
export class InterpreterService {

  private _http = inject( HttpClient );

  onCreate( body: any ) {
    return this._http.post( admin_service + `${entity}/create/interpreter`, body );
  }

  onFindAll( filter: IPagerFilter, page: number ) {

    let params = `page=${ page }`;
    params += `&filter=${ filter.filter }`;
    params += `&active=${ !filter.active }`;
    params += `&limit=${ filter.limit }`;
    params += `&order=${ filter.order }`;

    return this._http.get<IUserListResponse>( admin_service + `${entity}/find/interpreter?${params}` );
  }

  onFindById( id: string ) {
    return this._http.get<IUserByIdResponse>( admin_service + `${entity}/find/interpreter/${ id }` );
  }

  onUpdate( body: any, id: string ) {
    return this._http.patch( admin_service + `${entity}/update/interpreter/${ id }`, body );
  }

  onDelete( id: string ) {
    return this._http.delete( admin_service + `${entity}/delete/interpreter/${ id }` );
  }

}
