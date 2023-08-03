import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ITwilioToken } from 'src/app/interfaces/call-interfaces/twilio.interface';
import { admin_service } from 'src/globals';

@Injectable({providedIn: 'root'})
export class TwilioService {

  private _http = inject( HttpClient );

  onGenerateToken() {
    return this._http.get<ITwilioToken>( admin_service + '/twilio/access-token' );
  }

}
