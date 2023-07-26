import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UiService } from 'src/app/services/ui.service';
import * as segurityActions from '../../../redux/actions/segurity.actions';

@Component({
  selector: 'app-login-to-interpreter',
  templateUrl: './login-to-interpreter.component.html',
  styleUrls: ['./login-to-interpreter.component.scss']
})
export class LoginToInterpreterComponent {

  singin$?: Subscription;

  private _authsvc = inject( AuthService );
  private _st = inject( StorageService );
  private _store = inject( Store );
  private _router = inject( Router );
  private _uisvc = inject( UiService );

  frmLogin = new UntypedFormGroup({});
  submitted = false;
  fieldTextType = true;
  loading = false;

  private _formBuilder = inject( UntypedFormBuilder );

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.frmLogin = this._formBuilder.group({
      username    : [ '', [ Validators.required ] ],
      password : [ '', [ Validators.required ] ],
    });
  }

  get f() { return this.frmLogin.controls }
  touched( field: string ) { return this.frmLogin.get(field)?.touched ?? false }

  get values(): { username: string; password: string; } {
    return this.frmLogin.value;
  }

  get invalid(){ return this.frmLogin.invalid }

  onSubmit() {

    if( this.invalid || this.loading ) return;

    this.loading = true;
    this._uisvc.onShowLoading();

    this.singin$ = this._authsvc.onSingin( this.values )
    .subscribe( {
      next: (response) => {

        const { data, token } = response;

        this._st.setItem('token', token);
        this._store.dispatch( segurityActions.onLoadMenu() );
        this.loading = false;
        this._uisvc.onClose();

        if( data.roles.some( (r) => r.code == 'INTERPRETER' ) ) {

          this._router.navigateByUrl('/admin/portal-interpreter');
        }

        this._router.navigateByUrl('/admin');

        console.log('response ::: ', response);

        this.singin$?.unsubscribe();
      },
      error: (e) => {

        this.loading = false;
        this.singin$?.unsubscribe();
      }
    } );

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.singin$?.unsubscribe();
  }

}