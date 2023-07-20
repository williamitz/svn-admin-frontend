import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILanguageListResponse } from 'src/app/interfaces/admin-interfaces/language.interface';
import { admin_service } from 'src/globals';

@Injectable({providedIn: 'root'})
export class IdiomService {

  private _http = inject( HttpClient );

  findAll( filter = '' ) {
    let params = `filter=${ filter }`;

    return this._http.get<ILanguageListResponse>( admin_service + `/language?${ params }` );
  }

}
