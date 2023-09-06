import { Component, OnInit, inject } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { emailPatt } from 'src/app/utils';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private _forgot$?: Subscription;

  passresetForm!: UntypedFormGroup;
  submitted = false;

  private _loading = false;

  private _formBuilder = inject( UntypedFormBuilder );
  private _authsvc = inject( AuthService );

  ngOnInit(): void {
    this.passresetForm = this._formBuilder.group({
      email: [ '', [ Validators.required, Validators.pattern( emailPatt ) ] ]
    });
  }

  get f() { return this.passresetForm.controls; }
  get values(): { email: string; } { return this.passresetForm.value; }
  get invalid(){ return this.passresetForm.invalid; }
  get loading() { return this._loading; }
  touched( field: string ) {
    return this.passresetForm.get(field)?.touched ?? false;
  }

  onSubmit() {

    if( this.invalid || this._loading ) return;

    this._loading = true;

    this._forgot$ = this._authsvc.onForgotPassword( this.values )
    .subscribe({
      next: (response) => {

        this.submitted = true;

        console.log('response ::: ', response);

        this._loading = false;
        this._forgot$?.unsubscribe();
      },
      error: ( e ) => {

        this._loading = false;
        this._forgot$?.unsubscribe();
      }
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._forgot$?.unsubscribe();
  }

}
