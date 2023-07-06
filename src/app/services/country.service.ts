import { Injectable, inject } from '@angular/core';
import { IPagerFilter } from '../interfaces/pager.interface';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/globals';
import { ICountryListResponse } from '../interfaces/country.interface';

const entity = 'country';

@Injectable({providedIn: 'root'})
export class CountryService {

  private _http = inject( HttpClient );

  onFindAll( page = 1, filter?: IPagerFilter ) {

    let params = `page=${ page }`;
    params += `&limit=${ filter?.limit ?? 0 }`;

    return this._http.get<ICountryListResponse>( `${ admin_service }/${ entity }?${ params }` );
  }

}
