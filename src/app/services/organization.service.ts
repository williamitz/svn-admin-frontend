import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IPagerFilter } from '../interfaces/pager.interface';
import { IListOrganizationByIdResponse, IListOrganizationResponse } from '../interfaces/organization.interface';

const entity = 'organization'

@Injectable({providedIn: 'root'})
export class OrganizationService {

  private _http = inject( HttpClient );

  onCreate( body: any ) {
    return this._http.post( `${ admin_service }/${ entity }`, body );
  }

  onUpdate( body: any, id: string ) {
    return this._http.put( `${ admin_service }/${ entity }/${ id }`, body );
  }

  onDelete( id: string ) {
    return this._http.delete( `${ admin_service }/${ entity }/${ id }` );
  }

  onFindAll( filter: IPagerFilter, page: number ) {

    let params = `page=${ page }`;
    params += `&filter=${ filter.filter }`;
    params += `&active=${ !filter.active }`;
    params += `&limit=${ filter.limit }`;
    params += `&order=${ filter.order }`;

    return this._http.get<IListOrganizationResponse>( `${ admin_service }/${ entity }?${ params }` );
  }

  onFindById( id: string ) {
    return this._http.get<IListOrganizationByIdResponse>( `${ admin_service }/${ entity }/${ id }` );
  }

}