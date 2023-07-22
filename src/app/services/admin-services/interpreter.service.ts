import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IPagerFilter } from '../../interfaces/pager.interface';
import { IUserByIdResponse, IUserListResponse } from '../../interfaces/segurity-interfaces/user.interface';
import { IInterpreterByIdResponse, IInterpreterListResponse } from 'src/app/interfaces/admin-interfaces/interpreter.interface';
import { IInterpreterProfileResponse } from 'src/app/interfaces/admin-interfaces/profile.interface';

@Injectable({providedIn: 'root'})
export class InterpreterService {

  private _http = inject( HttpClient );

  onCreate( body: any ) {
    return this._http.post( admin_service + `/interpreter`, body );
  }

  onFindAll( filter: IPagerFilter, page: number ) {

    let params = `page=${ page }`;
    params += `&filter=${ filter.filter }`;
    params += `&active=${ !filter.active }`;
    params += `&limit=${ filter.limit }`;
    params += `&order=${ filter.order }`;

    return this._http.get<IInterpreterListResponse>( admin_service + `/interpreter?${params}` );
  }

  onFindById( id: string ) {
    return this._http.get<IInterpreterProfileResponse>( admin_service + `/interpreter/${ id }` );
  }

  onUpdate( body: any, id: string ) {
    return this._http.patch( admin_service + `/interpreter/${ id }`, body );
  }

  onDelete( id: string ) {
    return this._http.delete( admin_service + `/interpreter/${ id }` );
  }

}
