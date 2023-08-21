import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { admin_service } from 'src/globals';
import { INomenclatureResponse } from '../interfaces/nomenclature.interface';

const entity = '/nomenclature';

@Injectable({providedIn: 'root'})
export class NomenclatureService {

  private _http = inject( HttpClient );

  onGetMenuActions( filter = '', page = 0, limit = 0 ) {

    let params = `page=${ page }`;
    params += `&filter=${ filter }`;
    params += `&limit=${ limit }`;

    return this._http.get<INomenclatureResponse>( admin_service + `${ entity }/menu?${ params }` );
  }

  onGetCallType() {
    return this._http.get<INomenclatureResponse>( admin_service + `${ entity }/call-type` );
  }

  onGetContactType() {
    return this._http.get<INomenclatureResponse>( admin_service + `${ entity }/contact-type` );
  }



}
