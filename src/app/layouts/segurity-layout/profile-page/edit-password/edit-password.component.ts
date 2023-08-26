import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../../../interfaces/segurity-interfaces/user.interface';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { passwordPatt } from 'src/app/utils';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent {
  @Input() user: IUser | null = null;

  frmPassword!: UntypedFormGroup;
  private _saving = false;
  private _loadData = false;

  private _frmBuilder = inject( UntypedFormBuilder );

  get saving() { return this._saving; }
  get controls() { return this.frmPassword.controls; }
  get passwordMatchError() { return this.frmPassword.getError('notSame'); }
  get invalid() { return this.frmPassword.invalid; }
  get loadData() { return this._loadData; }
  touched( field: string ) { return this.frmPassword.get( field )?.touched; }

  ngOnInit(): void {
    this.onBuildFrm();
  }

  onBuildFrm(){
    this.frmPassword = this._frmBuilder.group({
      currentPassword:     [ '', [ Validators.required, Validators.pattern( passwordPatt ) ] ],
      password:     [ '', [ Validators.required, Validators.pattern( passwordPatt ) ] ],
      confirmPassword:     [ '', [ Validators.required, Validators.pattern( passwordPatt ) ] ],
    }, { validators: this.checkPasswords });
  }

  private checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  changePassword() {

  }

  reset(){
    this.frmPassword.reset();
  }
}
