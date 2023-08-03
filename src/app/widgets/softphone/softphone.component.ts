import { Component, inject } from '@angular/core';

import { Device } from '@twilio/voice-sdk';
import { Call } from '@twilio/voice-sdk';
import { Subscription } from 'rxjs';
import { TwilioService } from 'src/app/services/call-services/twilio.service';
@Component({
  selector: 'app-softphone',
  templateUrl: './softphone.component.html',
  styleUrls: ['./softphone.component.scss']
})
export class SoftphoneComponent {

  private _token$?: Subscription;

  private _twiliosvc = inject( TwilioService );

  private _accessToken = '';
  private _device?: Device;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.onLoadToken();

  }

  onLoadToken() {
    this._token$ = this._twiliosvc.onGenerateToken()
    .subscribe({
      next: (response) => {

        const { token } = response;

        this._accessToken = token;


        this.onLoadDevice();

      },
      error: (e) => {

        console.log('error :::: ', e);

      }
    })
  }

  onLoadDevice() {
    // device =

    this._device = new Device( this._accessToken , {
      logLevel:1,
      // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
      // providing better audio quality in restrained network conditions.
      codecPreferences: [ Call.Codec.Opus, Call.Codec.PCMU],
    });

    console.log('this._device ::: ', this._device);

    // Device must be registered in order to receive incoming calls
    this._device.register();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
