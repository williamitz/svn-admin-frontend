import { Component, inject, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UniquenessValidator } from 'src/app/classes/unique-validator.class';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { AgencyService } from 'src/app/services/admin-services/agency.service';
import { RoleService } from 'src/app/services/segurity-services/role.service';
import { UserService } from 'src/app/services/segurity-services/user.service';
import { UiService } from 'src/app/services/ui.service';
import { emailPatt, fullTextPatt } from 'src/app/utils';
import { IRole } from '../../../../interfaces/segurity-interfaces/role.interface';
import { IUser } from '../../../../interfaces/segurity-interfaces/user.interface';

@Component({
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.scss']
})
export class EditPersonalDetailsComponent {

  @Input() user: IUser | null = null;

  private _agency$?: Subscription;
  private _role$?: Subscription;
  private _update$?: Subscription;

  private _agencysvc = inject( AgencyService );
  private _rolesvc   = inject( RoleService );
  private _usersvc   = inject( UserService );
  private _uisvc = inject( UiService );
  private _translatesvc = inject( TranslateService );

  agencies: any[] = [];
  roles: IRole[] = [];

  private _frmBuilder = inject( UntypedFormBuilder );
  frmUser!: UntypedFormGroup;

  private _saving = false
  private _loadData = false
  private _loading = false

  get saving() { return this._saving; }
  get loadData() { return this._loadData; }
  get values() { return this.frmUser.value; }
  get invalid() { return this.frmUser.invalid || this.frmUser.pending; }
  get loading() { return this._loading; }
  get emailInvalid() {
    return (this.frmUser.controls['email'].errors && this.frmUser.get('email')?.touched) || (this.frmUser.controls['email'].errors && this.frmUser.controls['email'].errors['alreadyExits'])
  }

  get controls() { return this.frmUser.controls; }
  touched( field: string ) { return this.frmUser.get( field )?.touched; }


  ngOnInit(): void {

    this.onBuildFrm();

    this.onGetAgencies();

    this.onGetRoles();
  }

  ngOnChanges(changes: any): void{

    if(changes.user && this.frmUser){
      this.setDefaultValue();
    }

  }

  onBuildFrm() {

    this.frmUser = this._frmBuilder.group({
      name:     [ '', [ Validators.required, Validators.pattern( fullTextPatt ) ] ],
      surname:  [ '', [ Validators.required, Validators.pattern( fullTextPatt ) ] ],
      email:    [ '', [ Validators.required, Validators.pattern( emailPatt ) ], [UniquenessValidator.createValidator(this._usersvc, this.user?.email)] ],
      phone:    [ '', [  ] ],
      roles:    [ null, [ Validators.required, Validators.minLength(1) ] ],
      agencyId: [ null, [ Validators.required ] ],
    });

    this.setDefaultValue();

  }

  onGetAgencies() {

    this._agency$ = this._agencysvc.onFindAllByUser()
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        this.agencies = data;

        this._agency$?.unsubscribe();
      },
      error: (e) => {

        this._agency$?.unsubscribe();
      }
    });

  }

  onGetRoles() {
    this._role$ = this._rolesvc.onFindAll()
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        this.roles = [...data];

        this._role$?.unsubscribe();
      },
      error: (e) => {

        this._role$?.unsubscribe();
      }
    })
  }


  onSubmit() {

    if( !this._loadData && this.user?.id ) {

      const body = Object.assign({...this.user}, {...this.values});
      body.agencyId = body.agency.id;
      body.roles = body.roles.map((rol: any) => rol.id);

      this._update$ = this._usersvc.onUpdate( body, this.user.id )
        .subscribe({
         next: (response) => {
          this._uisvc.onClose();
          this._uisvc.onShowAlert( this._translatesvc.instant('TOAST.PERSONAL_DETAILS_SUCCESS'), EIconAlert.success );
           this._update$?.unsubscribe();
         },
         error: (e) => {
           console.error(e);
           this._update$?.unsubscribe();
         }
       });

      }

  }


  setDefaultValue(){
    const [name, surname]: any = this.user?.fullname.split(", ");

    this.frmUser.reset({...this.user, 
      agencyId: this.user?.agency?.id, name, surname,
      roles: this.user?.roles?.map(rol => rol.id)
    });

    this.frmUser.get('roles')?.disable();
    this.frmUser.get('agencyId')?.disable();
  }

}
