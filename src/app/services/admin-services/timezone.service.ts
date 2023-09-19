import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { admin_service } from 'src/environments/environment';
import { ITimezoneListresponse } from '../../interfaces/admin-interfaces/timezone.interface';

const entity = '/time-zone';

@Injectable({ providedIn: 'root' })
export class TimezoneService {
  private _http = inject(HttpClient);

  onFindAll(country: string) {
    return this._http.get<ITimezoneListresponse>(
      admin_service + `${entity}/by-country?filter=${country}`
    );
  }
}
