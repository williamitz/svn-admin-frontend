import { Component, inject, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AgencyService } from 'src/app/services/admin-services/agency.service';
import { RoleService } from 'src/app/services/segurity-services/role.service';
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
  get invalid() { return this.frmUser.invalid; }
  get loading() { return this._loading; }

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
      email:    [ '', [ Validators.required, Validators.pattern( emailPatt ) ] ],
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

    if( !this._loadData ) {

      /*this._create$ = this._usersvc.onCreate( this.values )
      .subscribe({
        next: (response) => {


          console.log('response ::: ', response);

          this.onGetUsers( this.currentPage );

          this.onReset();
          this._create$?.unsubscribe();
        },
        error: (e) => {

          this._create$?.unsubscribe();
        }
      });*/

    }
    // else {

    //   this._update$ = this._usersvc.update( this.values, this._id )
    //   .subscribe({
    //     next: (response) => {

    //       this._update$?.unsubscribe();
    //     },
    //     error: (e) => {

    //       this._update$?.unsubscribe();
    //     }
    //   });

    // }

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
