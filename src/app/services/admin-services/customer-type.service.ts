import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICustomerTypeListResponse } from 'src/app/interfaces/admin-interfaces/customer-type.interface';
import { admin_service } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerTypeService {
  private _http = inject(HttpClient);

  onFindAll() {
    return this._http.get<ICustomerTypeListResponse>(
      admin_service + '/customer-type'
    );
  }
}
