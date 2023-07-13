import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IPagerFilter } from '../../interfaces/pager.interface';
import { IUserByIdResponse, IUserListResponse } from '../../interfaces/segurity-interfaces/user.interface';

const entity = '/user';

@Injectable({providedIn: 'root'})
export class ClientService {

  private _http = inject( HttpClient );

  onCreate( body: any ) {
    return this._http.post( admin_service + `${entity}/create/client`, body );
  }

  onFindAll( filter: IPagerFilter, page: number ) {

    let params = `page=${ page }`;
    params += `&filter=${ filter.filter }`;
    params += `&active=${ !filter.active }`;
    params += `&limit=${ filter.limit }`;
    params += `&order=${ filter.order }`;

    return this._http.get<IUserListResponse>( admin_service + `${entity}/find/client?${params}` );
  }

  onFindById( id: string ) {
    return this._http.get<IUserByIdResponse>( admin_service + `${entity}/find/client/${ id }` );
  }

  onUpdate( body: any, id: string ) {
    return this._http.patch( admin_service + `${entity}/update/client/${ id }`, body );
  }

  onDelete( id: string ) {
    return this._http.delete( admin_service + `${entity}/delete/client/${ id }` );
  }

}
