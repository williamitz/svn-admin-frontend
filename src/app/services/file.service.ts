import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { admin_service } from 'src/environments/environment';
import { IFileInterpreterListResponse } from '../interfaces/files.interface';

@Injectable({ providedIn: 'root' })
export class FileService {
  private _http = inject(HttpClient);

  uploadInterpreter(body: any, id?: string) {
    return this._http.post(
      admin_service + `/file-user${id ? `/${id}` : ''}`,
      body
    );
  }

  findAll(page: number, limit: number, id?: string) {
    let params = `page=${page}`;
    params += `&limit=${limit}`;

    return this._http.get<IFileInterpreterListResponse>(
      admin_service + `/file-user${id ? `/findById/${id}` : ''}?${params}`
    );
  }

  onDelete(id: string) {
    return this._http.delete<any>(admin_service + `/file-user/${id}`);
  }
}
