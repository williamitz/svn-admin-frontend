import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IPagerFilter } from '../../interfaces/pager.interface';
import { ICustomerByIdResponse, ICustomerListResponse } from 'src/app/interfaces/admin-interfaces/customer.interface';
import { map } from 'rxjs';

const entity = '/customer';

@Injectable({providedIn: 'root'})
export class CustomerService {

  private _http = inject( HttpClient );

  onCreate( body: any ) {
    return this._http.post( admin_service + `${entity}`, body );
  }

  onFindAll( filter: IPagerFilter, page: number ) {

    let params = `page=${ page }`;
    params += `&filter=${ filter.filter }`;
    params += `&active=${ !filter.active }`;
    params += `&limit=${ filter.limit }`;
    params += `&order=${ filter.order }`;

    return this._http.get<ICustomerListResponse>( admin_service + `${entity}?${params}` );
  }

  onFindById( id: string ) {
    return this._http.get<ICustomerByIdResponse>( admin_service + `${entity}/${ id }` )
    .pipe(
      map( (response) => {

        const newResponse = {...response};

        newResponse.data.departments = newResponse.data.departments.filter( (e) => e.status );

        return newResponse;
      } )
    );
  }

  onUpdate( body: any, id: string ) {
    return this._http.put( admin_service + `${entity}/${ id }`, body );
  }

  onDelete( id: string ) {
    return this._http.delete( admin_service + `${entity}/${ id }` );
  }

}
