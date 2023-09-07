import { Component, inject, Input } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/segurity-services/user.service';
import { passwordPatt } from 'src/app/utils';
import { IUser } from '../../../../interfaces/segurity-interfaces/user.interface';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  @Input() user: IUser | null = null;

  private _usersvc   = inject( UserService );
  private _uisvc = inject( UiService );
  private _translatesvc = inject( TranslateService );

  private _changePassword$?: Subscription;

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
    if(this.user?.id){
      this._changePassword$ = this._usersvc.onChangePassword(this.user?.id, this.frmPassword.value['password']).subscribe({
        next: (data) => {
          this._uisvc.onClose();
          this._uisvc.onShowAlert( this._translatesvc.instant('TOAST.PASSWORD_CHANGED_SUCCESS'), EIconAlert.success );
          this.reset();
          this._changePassword$?.unsubscribe();
        },
        error: (e) => {
          console.error(e);
          this._changePassword$?.unsubscribe();
        }
      })
    }
  }

  reset(){
    this.frmPassword.reset();
    document.getElementById('btnCloseModalChangePassword')?.click();
  }

}
