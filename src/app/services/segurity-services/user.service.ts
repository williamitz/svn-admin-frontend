import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_service } from 'src/environments/environment';
import {
  IUserByIdResponse,
  IUserListResponse,
} from 'src/app/interfaces/segurity-interfaces/user.interface';
import { IPagerFilter } from 'src/app/interfaces/pager.interface';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _http = inject(HttpClient);

  findAll(query: IPagerFilter, page: number) {
    let params = `page=${page}`;
    params += `&active=${!query.active}`;
    params += `&filter=${query.filter}`;
    params += `&limit=${query.limit}`;
    params += `&order=${query.order}`;

    return this._http.get<IUserListResponse>(admin_service + `/user?${params}`);
  }

  onFindById(id: string) {
    return this._http.get<IUserByIdResponse>(admin_service + `/user/${id}`);
  }

  onCreate(body: any) {
    return this._http.post(admin_service + `/user`, body);
  }

  onUpdate(body: any, id: string) {
    return this._http.put(admin_service + `/user/${id}`, body);
  }

  onUpdateWithPatch( body: any, id: string ) {
    return this._http.patch( admin_service + `/user/${ id }`, body );
  }

  onDelete(id: string) {
    return this._http.delete(admin_service + `/user/${id}`);
  }

  onChangePassword(userId: string, password: string){
    return this._http.patch( admin_service + `/user/${userId}/change-password`, {password});
  }

  onChangeMyPassword(current: string, password: string){
    return this._http.patch( admin_service + `/user/me/change-password`, {current, password});
  }

  validateUniqueness(value: string){

    // TODO: replace with the endpoint

    let existingUsernames = ['repeated@gmail.com'];

    return of(existingUsernames.some((a) => a === value)).pipe(
      delay(1000)
    );
  }

}
