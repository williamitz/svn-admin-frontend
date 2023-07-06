import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IPagerFilter } from '../interfaces/pager.interface';
import { IUserListResponse } from '../interfaces/user.interface';

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

}
