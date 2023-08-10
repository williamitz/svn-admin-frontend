import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { Device } from '@twilio/voice-sdk';
import { Call } from '@twilio/voice-sdk';
import { Subscription } from 'rxjs';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { ICallIo } from 'src/app/interfaces/call-interfaces/twilio.interface';
import { TwilioService } from 'src/app/services/call-services/twilio.service';
import { SocketService } from 'src/app/services/socket.service';
import { UiService } from 'src/app/services/ui.service';

interface IDevice {
  id: string;
  label: string;
}

@Component({
  selector: 'app-softphone',
  templateUrl: './softphone.component.html',
  styleUrls: ['./softphone.component.scss']
})
export class SoftphoneComponent {

  private _token$?: Subscription;

  private _twiliosvc = inject( TwilioService );
  private _socketsvc = inject( SocketService );
  private _uisvc = inject( UiService );


  private _accessToken = '';
  private _device?: Device;

  ringtoneDefault?: Set<MediaDeviceInfo>;
  speakerDefault?: Set<MediaDeviceInfo>;

  ringtoneDevices: IDevice[] = [];
  speakerDevices: IDevice[] = [];

  availableOutputDevices?: Map<string, MediaDeviceInfo>;

  frmPhone!: UntypedFormGroup;
  private _frmBuilder = inject( UntypedFormBuilder );

  get values(): { ringtone: string; speaker: string; } { return this.frmPhone.value; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.onLoadToken();

    this.frmPhone = this._frmBuilder.group({
      ringtone: [ null, [] ],
      speaker: [ null, [] ]
    })

    this.onListenCall();

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

 async onLoadDevice() {
    // device =

    this._device = new Device( this._accessToken , {
      logLevel:1,
      // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
      // providing better audio quality in restrained network conditions.
      codecPreferences: [ Call.Codec.Opus, Call.Codec.PCMU],
    });

    this._device.on("registered", function () {
      console.log("Twilio.Device Ready to make and receive calls!");
    });

    this._device.on("error", function (error) {
     console.log("Twilio.Device Error: " + error.message);
    });

    this._device.on("incoming", (call) => {
      console.log(`Incoming call from ${call.parameters.From}`);

      //show incoming call div and incoming phone number

      // add event listener to call object
      call.on("cancel", () => {

      });
      call.on("disconnect", () => {

      });
      call.on("reject", () => {

      });
    });

    // Device must be registered in order to receive incoming calls
    await this._device.register();

    this.availableOutputDevices = this._device.audio?.availableOutputDevices;


    this.onLoadRingtoneDevice();
    this.onLoadSpeakerDevice();

  }

  onLoadSpeakerDevice() {

    this.speakerDevices = [];

    this.speakerDefault = this._device!.audio?.speakerDevices.get();

    this.availableOutputDevices?.forEach( (device, id) => {

      let isActive = this.speakerDefault?.size === 0 && id === "default";

      this.speakerDefault?.forEach((device) => {
        if (device.deviceId === id) {
          isActive = true;
        }
      });

      this.speakerDevices.push({
        id,
        label: device.label
      });


      if (isActive) {
        this.frmPhone.get('speaker')?.setValue( id );
      }

    });

  }

  onLoadRingtoneDevice() {

    this.ringtoneDevices = [];

    this.ringtoneDefault = this._device!.audio?.ringtoneDevices.get();

    this.availableOutputDevices?.forEach( (device, id) => {
      let isActive = this.ringtoneDefault?.size === 0 && id === "default";

      this.ringtoneDefault?.forEach((device) => {
        if (device.deviceId === id) {
          isActive = true;
        }
      });

      this.ringtoneDevices.push({
        id,
        label: device.label
      });


      if (isActive) {
        this.frmPhone.get('ringtone')?.setValue( id );
      }

    });

  }

  onSetDevice( opt: any, isSpeaker = false ) {


    if( isSpeaker ) {
      this._device?.audio?.ringtoneDevices.set(
        this.values.speaker
      );
    } else {
      this._device?.audio?.ringtoneDevices.set(
        this.values.ringtone
      );
    }
  }

  onListenCall() {
    this._socketsvc.onListen('new-call')
    .subscribe( (response) => {

      const { To, From, CallSid, CallStatus } = response as ICallIo;
      console.log('response ::. ', response);

      this._uisvc.onShowAlert(`Llamada entrante (${ CallSid })`, EIconAlert.info, undefined, `De: ${ To } <> para: ${ From }` );

    } )
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
