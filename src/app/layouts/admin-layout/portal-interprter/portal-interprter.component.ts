import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as segurityActions from '../../../redux/actions/segurity.actions';
import { Subscription } from 'rxjs';
import { InterpreterService } from 'src/app/services/admin-services/interpreter.service';
import { IAppState } from 'src/app/app.state';

@Component({
  selector: 'app-portal-interprter',
  templateUrl: './portal-interprter.component.html',
  styleUrls: ['./portal-interprter.component.scss']
})
export class PortalInterprterComponent {

  private _update$?: Subscription;
  private _segurotyrx$?: Subscription;



  lista=[
    {
      calltype: 'Phone Call',
      ratexmin: '0.10',
      connectiontime: '0',
      duration: '02:00'
    },
    {
      calltype: 'Phone Call',
      ratexmin: '0.10',
      connectiontime: '0',
      duration: '02:00'
    },
    {
      calltype: 'Phone Call',
      ratexmin: 'Por0.10',
      connectiontime: '0',
      duration: '02:00'
    }
  ];

  listaOpi = [
    {
      date: '08/31/2022',
      ratexhour: '0.30',
      ratexmin: '0.10',
      calltype: 'OPI',
    },
    {
      date: '08/31/2022',
      ratexhour: '0.30',
      ratexmin: '0.10',
      calltype: 'OPI',
    },
    {
      date: '08/31/2022',
      ratexhour: '0.30',
      ratexmin: '0.10',
      calltype: 'OPI',
    }
  ]


  listaOnsite = [
    {
      assignmenttype: 'type',
      date: '08/31/2022',
      assignmentaddress: 'Av. Velzon #123',
      name: 'Timothy Smith',
      email: 'smith@gmail.com',
      numberphone: '987325416',
      interpreter: 'José Lopez',
      id: '123456',
      comment: 'lorem ipsum '
    },
    {
      assignmenttype: 'type',
      date: '08/31/2022',
      assignmentaddress: 'Av. Velzon #123',
      name: 'Timothy Smith',
      email: 'smith@gmail.com',
      numberphone: '987325416',
      interpreter: 'José Lopez',
      id: '123456',
      comment: 'lorem ipsum '
    },
    {
      assignmenttype: 'type',
      date: '08/31/2022',
      assignmentaddress: 'Av. Velzon #123',
      name: 'Timothy Smith',
      email: 'smith@gmail.com',
      numberphone: '987325416',
      interpreter: 'José Lopez',
      id: '123456',
      comment: 'lorem ipsum '
    }
  ]

  profileRating = 5;

  enableEdit = false;

  private _saving = false;

  frmAditional!: UntypedFormGroup;
  private _frmBuilder = inject( UntypedFormBuilder );

  private _interpretersvc = inject( InterpreterService );
  private _store: Store<IAppState> = inject( Store<IAppState> );

  private _location = '';
  private _mrn = '';
  private _client = '';

  get invalid() { return this.frmAditional.invalid; }
  get saving() { return this._saving; }
  get controls() { return this.frmAditional.controls; }
  get values(): { location: string, mrn: string, client: string } { return this.frmAditional.value; }
  touched( field: string ) { return this.frmAditional.get( field )?.touched; }

  get location() { return this._location };
  get mrn() { return this._mrn };
  get client() { return this._client };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.frmAditional = this._frmBuilder.group({
      location:  [ '', [ Validators.required ] ],
      mrn:       [ '', [ Validators.required ] ],
      client:    [ '', [ Validators.required ] ],
    });

    this.onListenSegurityRx();

  }

  onHandleEnableEdit() {

    this.enableEdit =  !this.enableEdit;

    if ( this.enableEdit ) {

      this.frmAditional.get('location')?.addValidators([ Validators.required ]);
      this.frmAditional.get('mrn')?.addValidators([ Validators.required ]);
      this.frmAditional.get('client')?.addValidators([ Validators.required ]);


    } else {

      this.frmAditional.get('location')?.addValidators([ Validators.required ]);
      this.frmAditional.get('mrn')?.addValidators([ Validators.required ]);
      this.frmAditional.get('client')?.addValidators([ Validators.required ]);

    }

    this.frmAditional.get('location')?.updateValueAndValidity();
    this.frmAditional.get('mrn')?.updateValueAndValidity();
    this.frmAditional.get('client')?.updateValueAndValidity();
  }

  onListenSegurityRx() {
    this._segurotyrx$ = this._store.select('segurity')
    .subscribe( (state) => {

      const { userData } = state;

      this._location = userData.location;
      this._mrn = userData.mrn;
      this._client = userData.client;

      this.frmAditional.get('location')?.setValue( userData.location );
      this.frmAditional.get('mrn')?.setValue( userData.mrn );
      this.frmAditional.get('client')?.setValue( userData.client );

    } );
  }

  onSubmit() {

    if( this.invalid || this._saving ) return;

    this._saving = true;

    const body = this.values;

    this._update$ = this._interpretersvc.onUpdateAdditional( body )
    .subscribe({
      next: (response) => {

        // onUpdateAdditional


        this._store.dispatch( segurityActions.onUpdateAdditional( { ...body } ) );

        this.onHandleEnableEdit();
        this._saving = false;
        this._update$?.unsubscribe();
      },
      error: (e) => {

        this._saving = false;
        this._update$?.unsubscribe();
      }
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._update$?.unsubscribe();

    this._segurotyrx$?.unsubscribe();
  }

}
