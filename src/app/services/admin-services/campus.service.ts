import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICampusListResponse } from 'src/app/interfaces/admin-interfaces/campus.interface';
import { admin_service } from 'src/globals';

@Injectable({providedIn: 'root'})
export class CampusService {

  private _http = inject( HttpClient );

  onFindAll() {
    return this._http.get<ICampusListResponse>( admin_service + '/campus' );
  }

}
