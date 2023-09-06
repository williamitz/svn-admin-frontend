import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { passwordPatt } from 'src/app/utils';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  private _resetpsw$?: Subscription;
  private _activateRoute = inject( ActivatedRoute );
  private _frmBuilder = inject( UntypedFormBuilder );
  private _route = inject( Router );
  private _authsvc = inject( AuthService );
  private _uisvc = inject( UiService );

  private _token = '';
  private _loading = false;
  fieldTextType = false;

  frmReset!: UntypedFormGroup;

  get f() { return this.frmReset.controls }
  touched( field: string ) { return this.frmReset.get(field)?.touched ?? false; }

  get values(): { newPassord: string; confirmPassord: string; } {
    return this.frmReset.value;
  }

  get invalid(){ return this.frmReset.invalid; }
  get loading() { return this._loading; }

  get noEquals() {
     return this.values.newPassord != this.values.confirmPassord;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.onBuildFrm();

    this._token = this._activateRoute.snapshot.paramMap.get('token') ?? '';

    if( this._token == '' ) {
      this._route.navigateByUrl('/auth/error');
      return;
    }

  }

  onToggleTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onBuildFrm() {

    this.frmReset = this._frmBuilder.group({
      newPassord: [ '', [ Validators.required, Validators.pattern( passwordPatt ) ] ],
      confirmPassord: [ '', [ Validators.required ] ]
    });

  }

  onSubmit() {

    if( this.invalid || this.noEquals ) return;


    this._loading = true;

    this._resetpsw$ = this._authsvc.onResetPassword( this.values, this._token )
    .subscribe({
      next: (response) => {

        console.log('response ::: ', response);

        this._loading = false;
        this._route.navigateByUrl('/auth/success');
        this._resetpsw$?.unsubscribe();
      },
      error: (e) => {

        console.log('error ::: ', {...e});

        this._uisvc.onShowAlert( e.error?.message ?? 'Unspected Error', EIconAlert.error );

        this._loading = false;
        this._resetpsw$?.unsubscribe();
      }
    });


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._resetpsw$?.unsubscribe();
  }

}
