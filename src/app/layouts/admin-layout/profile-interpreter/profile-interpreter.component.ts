import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IIdiom } from 'src/app/interfaces/admin-interfaces/idiom.interface';
import { IProfileInterpreter } from 'src/app/interfaces/admin-interfaces/profile.interface';
import { ITimezone } from 'src/app/interfaces/admin-interfaces/timezone.interface';
import { IdiomService } from 'src/app/services/admin-services/idiom.service';
import { InterpreterService } from 'src/app/services/admin-services/interpreter.service';
import { TimezoneService } from 'src/app/services/admin-services/timezone.service';

@Component({
  selector: 'app-profile-interpreter',
  templateUrl: './profile-interpreter.component.html',
  styleUrls: ['./profile-interpreter.component.scss']
})
export class ProfileInterpreterComponent {

  private _findById$?: Subscription;
  private _targetIdiom$?: Subscription;
  private _timezone$?: Subscription;


  lista = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  private _acivatedRoute = inject( ActivatedRoute );
  private _idiomsvc = inject( IdiomService );
  private _router = inject( Router );
  private _interpretersvc = inject( InterpreterService );
  private _timezonesvc = inject( TimezoneService );

  private _id = '';

  targetIdioms: IIdiom[] = [];
  timezones: ITimezone[] = [];

  loadingIdioms = false;
  loadingTimezone = false;

  frmInterpreter!: UntypedFormGroup;
  private _frmBuilder = inject( UntypedFormBuilder );

  get controls() { return this.frmInterpreter.controls; }
  touched( field: string ) { return this.frmInterpreter.get( field )?.touched; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this._id = this._acivatedRoute.snapshot.paramMap.get('id') ?? '';

    this.onBuildFrm();

    if( this._id !== '' ) {
      this.onLoadProfile();

      this.onGetTargetIdioms();

    } else {
      this._router.navigateByUrl('/admin/notfound');
    }

  }

  onBuildFrm() {
    this.frmInterpreter = this._frmBuilder.group({
      name:             [ '', [ ] ],
      surname:          [ '', [ ] ],
      email:            [ '', [ ] ],
      phone:            [ '', [ ] ],
      countryCode:      [ null, [ ] ],
      timzoneId:        [ null, [ ] ],
      nativeLanguageId: [ null, [ ] ],
      gender:           [ 'Male', [ ] ],
      targetLanguages:  [ [], [  ] ],
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
        this.frmInterpreter.get('nativeLanguageId')?.setValue(data.nativeLanguage.id);
        this.frmInterpreter.get('gender')?.setValue(data.gender);
        this.frmInterpreter.get('targetLanguages')?.setValue(
          data.targetLanguages.map( (e) => e.id )
        );

        this.onGetTimeZones( data.countryCode.substring(0, 2) );


        console.log('response ::: ', response);

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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._findById$?.unsubscribe();
    this._targetIdiom$?.unsubscribe();
  }

}
