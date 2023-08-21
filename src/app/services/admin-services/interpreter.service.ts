import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { IPagerFilter } from '../../interfaces/pager.interface';
import { IUserByIdResponse, IUserListResponse } from '../../interfaces/segurity-interfaces/user.interface';
import { IInterpreterByIdResponse, IInterpreterListResponse } from 'src/app/interfaces/admin-interfaces/interpreter.interface';
import { IInterpreterProfileResponse, IRateUpdateResponse, IUpdateContactResponse } from 'src/app/interfaces/admin-interfaces/profile.interface';
import { map } from 'rxjs';

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

    const urlGetProfile = id == '' ? '/interpreter/find/my-profile' : `/interpreter/${ id }`;

    return this._http.get<IInterpreterProfileResponse>( admin_service + urlGetProfile )
    .pipe(
      map( (response) => {

        const { data } = response;

        response.data.rates = data.rates.filter( (e) => e.status );

        return response;
      } )
    );
  }

  onUpdate( body: any, id: string ) {

    const urlUpdate = id == ''
              ? '/interpreter/update/my-profile'
              : `/interpreter/${ id }`;

    return this._http.put( admin_service + urlUpdate, body );
  }

  onDelete( id: string ) {
    return this._http.delete( admin_service + `/interpreter/${ id }` );
  }

  onUpdateRate( id: string, body: any ) {

    const urlUpdate = id == ''
              ? '/interpreter/update/rate-profile'
              : `/interpreter/${ id }/rate`;

    return this._http.put<IRateUpdateResponse>( admin_service + urlUpdate, body );
  }

  onUpdateContact( id: string, body: any ) {

    const urlUpdate = id == ''
              ? '/interpreter/update/contact-profile'
              : `/interpreter/${ id }/contact`;

    return this._http.put<IUpdateContactResponse>( admin_service + urlUpdate, body );
  }

  onUpdateOfficeHours( id: string, body: any ) {

    const urlUpdate = id == ''
              ? '/interpreter/update/office-hours-profile'
              : `/interpreter/${ id }/office-hours`;

    return this._http.put<IRateUpdateResponse>( admin_service + urlUpdate, body );
  }


  onUpdateAdditional( body: any ) {
    return this._http.put<IRateUpdateResponse>( admin_service + '/interpreter/update/additional', body );
  }

}
