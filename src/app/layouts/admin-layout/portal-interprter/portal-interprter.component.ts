import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portal-interprter',
  templateUrl: './portal-interprter.component.html',
  styleUrls: ['./portal-interprter.component.scss']
})
export class PortalInterprterComponent {

  private _update$?: Subscription;

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

  get invalid() { return this.frmAditional.invalid; }
  get saving() { return this._saving; }
  get controls() { return this.frmAditional.controls; }
  touched( field: string ) { return this.frmAditional.get( field )?.touched; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.frmAditional = this._frmBuilder.group({
      location:  [ '', [ Validators.required ] ],
      mrn:       [ '', [ Validators.required ] ],
      client:    [ '', [ Validators.required ] ],
    });

  }

  onHandleEnableEdit() {

    this.enableEdit =  !this.enableEdit;

    if ( this.enableEdit ) {

    } else {

    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
