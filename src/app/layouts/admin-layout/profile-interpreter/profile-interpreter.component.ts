import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { OfficeHourClass } from 'src/app/classes/office-hours.class';
import { RateClass } from 'src/app/classes/rate.class';
import { IIdiom } from 'src/app/interfaces/admin-interfaces/idiom.interface';
import { IProfileInterpreter, OfficeHour } from 'src/app/interfaces/admin-interfaces/profile.interface';
import { ITimezone } from 'src/app/interfaces/admin-interfaces/timezone.interface';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { INomenclature } from 'src/app/interfaces/nomenclature.interface';
import { IdiomService } from 'src/app/services/admin-services/idiom.service';
import { InterpreterService } from 'src/app/services/admin-services/interpreter.service';
import { TimezoneService } from 'src/app/services/admin-services/timezone.service';
import { NomenclatureService } from 'src/app/services/nomenclature.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-profile-interpreter',
  templateUrl: './profile-interpreter.component.html',
  styleUrls: ['./profile-interpreter.component.scss']
})
export class ProfileInterpreterComponent {

  private _findById$?: Subscription;
  private _targetIdiom$?: Subscription;
  private _timezone$?: Subscription;
  private _calltype$?: Subscription;
  private _update$?: Subscription;

  private _acivatedRoute = inject( ActivatedRoute );
  private _idiomsvc = inject( IdiomService );
  private _router = inject( Router );
  private _interpretersvc = inject( InterpreterService );
  private _timezonesvc = inject( TimezoneService );
  private _nomenclaturesvc = inject( NomenclatureService );
  private _uisvc = inject( UiService );

  private _officeHour: OfficeHour[] = [];

  private _days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  officeHours: OfficeHourClass[] = [
    new OfficeHourClass( false, 'Monday', null, null ),
    new OfficeHourClass( false, 'Tuesday', null, null ),
    new OfficeHourClass( false, 'Wednesday', null, null ),
    new OfficeHourClass( false, 'Thursday', null, null ),
    new OfficeHourClass( false, 'Friday', null, null ),
    new OfficeHourClass( false, 'Saturday', null, null ),
    new OfficeHourClass( false, 'Sunday', null, null ),
  ];

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  private _id = '';

  targetIdioms: IIdiom[] = [];
  timezones: ITimezone[] = [];
  calltype: INomenclature[] = [];
  rates: RateClass[] = [];

  loadingIdioms = false;
  loadingTimezone = false;
  saving = false;

  frmInterpreter!: UntypedFormGroup;
  private _frmBuilder = inject( UntypedFormBuilder );

  get controls() { return this.frmInterpreter.controls; }
  touched( field: string ) { return this.frmInterpreter.get( field )?.touched; }

  get invalid() { return this.frmInterpreter.invalid; }
  get invalidRepit() {

    let invalid = false;

    this.rates.forEach( (e, i, array) => {

      if( array.some( (j) => (j.typeValue == e.typeValue && e.auxId != j.auxId) ) ) {
        invalid = true;
      }

    } );

    return invalid;
  }
  get values() { return this.frmInterpreter.value; }
  get invalidRate() {
    return this.rates.some( (e) => e.invalid );
  }

  get id() { return this._id; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this._id = this._acivatedRoute.snapshot.paramMap.get('id') ?? '';

    this.onBuildFrm();

    this.onLoadProfile();

    this.onGetTargetIdioms();

    this.onLoadCallType();

  }

  onBuildFrm() {
    this.frmInterpreter = this._frmBuilder.group({
      name:             [ '',   [ Validators.required ] ],
      surname:          [ '',   [ Validators.required ] ],
      email:            [ '',   [ Validators.required ] ],
      phone:            [ '',   [ ] ],
      countryCode:      [ null, [ Validators.required ] ],
      timzoneId:        [ null, [ Validators.required ] ],
      nativeLanguageId: [ null, [  ] ],
      gender:           [ 'Male', [ Validators.required ] ],
      targetLanguages:  [ [],   [ Validators.required, Validators.min(1) ] ],
    });

  }

  onGetTargetIdioms() {
    this.loadingIdioms = true;
    this._targetIdiom$ = this._idiomsvc.findIdiomsAll()
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        console.log('response ::: ', response);

        this.targetIdioms = [...data];
        this.loadingIdioms = false;

        this._targetIdiom$?.unsubscribe();
      },
      error: (e) => {

        this.loadingIdioms = false;
        this._targetIdiom$?.unsubscribe();
      }
    });
  }

  onLoadProfile() {
    this._findById$ = this._interpretersvc.onFindById( this._id )
    .subscribe({
      next: (response) => {

        const { data } = response;

        this.frmInterpreter.get('name')?.setValue(data.name);
        this.frmInterpreter.get('surname')?.setValue(data.surname);
        this.frmInterpreter.get('email')?.setValue(data.email);
        this.frmInterpreter.get('phone')?.setValue(data.phone);
        this.frmInterpreter.get('countryCode')?.setValue(data.countryCode);
        this.frmInterpreter.get('timzoneId')?.setValue(data.timezone.id);
        this.frmInterpreter.get('nativeLanguageId')?.setValue(data?.nativeLanguage?.id);
        this.frmInterpreter.get('gender')?.setValue(data.gender);
        this.frmInterpreter.get('targetLanguages')?.setValue(
          data.targetLanguages.map( (e) => e.id )
        );

        this._officeHour = data.officeHours;

        this.officeHours = [];

        this.officeHours = this._days.map( (day) => {

          const finded = this._officeHour.find( (e) => e.dayName == day );

          if( finded ) {
            return new OfficeHourClass( finded.status, day, finded.timeStart, finded.timeEnd, finded.id );
          }

          return new OfficeHourClass( false, day, null, null );

        } );




        console.log('data.officeHours ::: ', data.officeHours);

        this.onGetTimeZones( data.countryCode.substring(0, 2) );

        const ratesDB = [...data.rates];

        this.rates = [];

        this.rates = ratesDB.map( (e) => {
          return new RateClass( e.type, +e.rate, e.id )
        } );



        // this.profile = {...data};

        this._findById$?.unsubscribe();
      },
      error: (e: HttpErrorResponse) => {

        this._findById$?.unsubscribe();
      }
    })
  }

  onGetTimeZones( code: string ) {
    this.loadingTimezone = true;
    this._timezone$ = this._timezonesvc.onFindAll( code )
    .subscribe((response) => {

      const { data, total } = response;

      this.timezones = data;
      this.loadingTimezone = false;

      this._timezone$?.unsubscribe();
    });
  }

  onAddrate() {
    this.rates.push(
      new RateClass( '', 0 )
    );
  }

  onRemoveRate( record: RateClass ) {
    this.rates = this.rates.filter( (c) => c.auxId != record.auxId );
  }

  onSubmit() {

    if( this.invalid || this.invalidRate || this.saving ) return;

    if( this.invalidRepit ) {
       this._uisvc.onShowAlert('Please type call, not repeat', EIconAlert.warning);

       return;
    }

    this.saving = true;

    this._uisvc.onShowLoading();

    const rates = this.rates.map( (e) => e.values );

    this._update$ = forkJoin({
      updateResponse: this._interpretersvc.onUpdate( this.values, this._id ),
      rateResponse: this._interpretersvc.onUpdateRate( this._id, { rates } )
    })
    .subscribe({
      next: ( response ) => {

        const { rateResponse } = response;

        const newRates = rateResponse.rates;

        this.rates = [];
        this.rates = newRates?.map( (e) => {
          return new RateClass( e.type, +e.rate, e.id )
        } ) ?? [];

        // console.log('update ::: ', updateResponse);
        // console.log('rate ::: ', rateResponse);

        this.saving = false;
        this._uisvc.onClose();
        this._uisvc.onShowAlert( 'Perfil actualziado con éxito', EIconAlert.success );
        this._update$?.unsubscribe();
      },
      error: (e) => {

        this.saving = false;
        // this._uisvc.onClose();
        this._update$?.unsubscribe();
      }
    });

  }

  onLoadCallType() {
    this._calltype$ = this._nomenclaturesvc.onGetCallType()
    .subscribe({
      next: (response) => {

        const { data } = response;

        this.calltype = data;

        this._calltype$?.unsubscribe();
      },
      error: (e) => {

        this._calltype$?.unsubscribe();
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._findById$?.unsubscribe();
    this._targetIdiom$?.unsubscribe();
    this._update$?.unsubscribe();

  }

}
