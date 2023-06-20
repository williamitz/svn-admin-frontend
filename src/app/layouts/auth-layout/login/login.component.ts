import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  frmLogin!: UntypedFormGroup;
  submitted = false;
  fieldTextType = true;

  private _formBuilder = inject( UntypedFormBuilder );

  ngOnInit(): void {
    this.frmLogin = this._formBuilder.group({
      email    : [ '', [ Validators.required ] ],
      password : [ '', [ Validators.required ] ],
    });
  }

  get f() { return this.frmLogin.controls; }

  onSubmit() {

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
