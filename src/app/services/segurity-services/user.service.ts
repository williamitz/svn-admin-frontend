import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IUserListResponse } from 'src/app/interfaces/segurity-interfaces/user.interface';
import { IPagerFilter } from 'src/app/interfaces/pager.interface';

@Injectable({providedIn: 'root'})
export class UserService {

  private _http = inject( HttpClient );

  findAll( query: IPagerFilter, page: number ) {

    let params = `page=${page}`;
    params += `&active=${!query.active}`;
    params += `&filter=${query.filter}`;
    params += `&limit=${query.limit}`;
    params += `&order=${query.order}`;

    return this._http.get<IUserListResponse>( admin_service + `/user?${ params }` );
  }

  onCreate( body: any ) {
    return this._http.post( admin_service + `/user`, body );
  }

  onUpdate( body: any, id: string ) {
    return this._http.put( admin_service + `/user/${ id }`, body );
  }

  onDelete( id: string ) {
    return this._http.delete( admin_service + `/user/${ id }` );
  }

}
