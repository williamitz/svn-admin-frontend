import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IIdiomListResponse } from 'src/app/interfaces/admin-interfaces/idiom.interface';
import { ILanguageListResponse } from 'src/app/interfaces/admin-interfaces/language.interface';
import { admin_service } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class IdiomService {
  private _http = inject(HttpClient);

  findAll(filter = '', ignore = '') {
    let params = `filter=${filter}`;
    params += `&ignore=${ignore}`;

    return this._http.get<ILanguageListResponse>(
      admin_service + `/language?${params}`
    );
  }

  findIdiomsAll(filter = '') {
    let params = `filter=${filter}`;
    return this._http.get<IIdiomListResponse>(
      admin_service + `/idiom?${params}`
    );
  }
}
