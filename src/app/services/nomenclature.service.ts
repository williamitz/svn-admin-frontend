import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { admin_service } from 'src/environments/environment';
import { INomenclatureResponse } from '../interfaces/nomenclature.interface';
import { map } from 'rxjs/operators';

const entity = '/nomenclature';

@Injectable({ providedIn: 'root' })
export class NomenclatureService {
  private _http = inject(HttpClient);

  onGetMenuActions(filter = '', page = 0, limit = 0) {
    let params = `page=${page}`;
    params += `&filter=${filter}`;
    params += `&limit=${limit}`;

    return this._http.get<INomenclatureResponse>(
      admin_service + `${entity}/menu?${params}`
    );
  }

  onGetCallType() {
    return this._http.get<INomenclatureResponse>(
      admin_service + `${entity}/call-type`
    );
  }

  onGetContactType() {
    return this._http.get<INomenclatureResponse>(
      admin_service + `${entity}/contact-type`
    );
  }

  onGetServicesType() {
    return this._http
      .get<INomenclatureResponse>(admin_service + `${entity}/service-type`)
      .pipe(
        map((response) => {
          const { data } = response;

          response.data = data.map((e) => {
            e.select = false;

            return e;
          });

          return response;
        })
      );
  }
}
