import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/environments/environment';
import { IPagerFilter } from '../../interfaces/pager.interface';
import {
  IMenuByIdResponse,
  IMenuResponse,
} from '../../interfaces/segurity-interfaces/menu.interface';

const entity = '/menu';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private _http = inject(HttpClient);

  onCreate(body: any) {
    return this._http.post(admin_service + entity, body);
  }

  onUpdate(body: any, id: string) {
    return this._http.put(admin_service + `${entity}/${id}`, body);
  }

  onDelete(id: string) {
    return this._http.delete(admin_service + `${entity}/${id}`);
  }

  onFindAll(filter: IPagerFilter, page: number) {
    let params = `page=${page}`;
    params += `&filter=${filter.filter}`;
    params += `&active=${!filter.active}`;
    params += `&limit=${filter.limit}`;
    params += `&order=${filter.order}`;

    return this._http.get<IMenuResponse>(admin_service + `${entity}?` + params);
  }

  onFindById(id: string) {
    return this._http.get<IMenuByIdResponse>(admin_service + `${entity}/${id}`);
  }

  onFindAllPather(filter: string, ignore = '') {
    let params = `filter=${filter}`;
    params += `&ignore=${ignore}`;
    return this._http.get<IMenuResponse>(admin_service + `${entity}?` + params);
  }
}
