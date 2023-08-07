import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private _st = inject( StorageService );

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this._st.getItem('token'),
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });

    const newRequest = req.clone({ headers });

    return next.handle(newRequest);
  }
}
