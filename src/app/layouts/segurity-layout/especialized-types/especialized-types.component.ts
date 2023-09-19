import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { IPager, IPagerFilter } from 'src/app/interfaces/pager.interface';
import { IRole, IUser } from 'src/app/interfaces/segurity-interfaces/user.interface';
import { AgencyService } from 'src/app/services/admin-services/agency.service';
import { PagerService } from 'src/app/services/pager.service';
import { RoleService } from 'src/app/services/segurity-services/role.service';
import { UserService } from 'src/app/services/segurity-services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { UiService } from 'src/app/services/ui.service';
import { fullTextPatt, emailPatt } from 'src/app/utils';

@Component({
  selector: 'app-especialized-types',
  templateUrl: './especialized-types.component.html',
  styleUrls: ['./especialized-types.component.scss']
})
export class EspecializedTypesComponent implements OnInit, OnDestroy {

  private _agency$?: Subscription;
  private _user$?: Subscription;
  private _role$?: Subscription;
  private _create$?: Subscription;
  private _update$?: Subscription;
  private _delete$?: Subscription;
  private _countrie$?: Subscription;

  selectedPeople: any;

  private _agencysvc = inject(AgencyService);
  private _usersvc = inject(UserService);
  private _pagersvc = inject(PagerService);
  private _rolesvc = inject(RoleService);
  private _st = inject(StorageService);
  private _uisvc = inject(UiService);

  agencies: any[] = [];
  users: IUser[] = [];
  roles: IRole[] = [];

  private _frmBuilder = inject(UntypedFormBuilder);
  frmUser!: UntypedFormGroup;
  frmFilter!: UntypedFormGroup;
  private _id = '';
  private _total = 0;
  private _saving = false;
  private _loadData = false;
  private _loading = false;

  paginate: IPager = {
    currentPage: 0,
    endPage: 1,
    pages: [],
    startPage: 1,
    totalPages: 0
  };

  get saving() { return this._saving; }
  get total() { return this._total; }
  get loadData() { return this._loadData; }
  get values() { return this.frmUser.value; }
  get valuesFilter(): IPagerFilter { return this.frmFilter.value; }
  get currentPage() { return this.paginate.currentPage; }
  get invalid() { return this.frmUser.invalid; }
  get loading() { return this._loading; }

  get controls() { return this.frmUser.controls; }
  touched(field: string) { return this.frmUser.get(field)?.touched; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.onBuildFrm();

    this.onGetAgencies();

    this.onGetUsers();

    this.onGetRoles();

  }

  onBuildFrm() {

    this.frmUser = this._frmBuilder.group({
      name: ['', [Validators.required, Validators.pattern(fullTextPatt)]],
      surname: ['', [Validators.required, Validators.pattern(fullTextPatt)]],
      email: ['', [Validators.required, Validators.pattern(emailPatt)]],
      phone: ['', []],
      roles: [null, [Validators.required, Validators.minLength(1)]],
      agencyId: [null, [Validators.required]],
    });

    this.frmFilter = this._frmBuilder.group({
      limit: [5, []],
      filter: ['', []],
      active: [false, []],
      order: ['', []],
    });

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

  onGetUsers(page = 1) {

    this._loading = true;

    this._user$ = this._usersvc.findAll(this.valuesFilter, page)
      .subscribe({
        next: (response) => {

          const { data, total } = response;

          this.users = data;
          this._total = total;

          this.paginate = this._pagersvc.getPager(total, page, this.valuesFilter.limit);

          this._loading = false;
          this._user$?.unsubscribe();
        },
        error: (e) => {

          this._loading = false;
          this._user$?.unsubscribe();
        }
      });
  }

  onLoadData(user: IUser) {

  }

  onReset() {
    this.frmUser.reset();
    document.getElementById('btnCloseModal')?.click();
  }

  onConfirm(record: IUser) {
    const { id, fullname, status } = record;

    this._uisvc.onShowConfirm(`¿Está seguro de ${status ? 'eliminar' : 'restaurar'} a: "${fullname}" ?`)
      .then((result) => {

        if (result.isConfirmed) {
          this.onDeleteUser(id, status);
        }

      });
  }

  onDeleteUser(id: string, status: boolean) {

    this._uisvc.onShowLoading();

    this._delete$ = this._usersvc.onDelete(id)
      .subscribe({
        next: (response) => {

          this.onGetUsers(this.currentPage);

          this._uisvc.onClose();
          this._uisvc.onShowAlert(`Usuario ${status ? 'eliminado' : 'restaurado'} exitosamente`, EIconAlert.success);

          this._delete$?.unsubscribe();
        },
        error: (e) => {
          this._delete$?.unsubscribe();
        }
      })

  }


  onSubmit() {

    if (!this._loadData) {

      this._create$ = this._usersvc.onCreate(this.values)
        .subscribe({
          next: (response:any) => {


            console.log('response ::: ', response);

            this.onGetUsers(this.currentPage);

            this.onReset();
            this._create$?.unsubscribe();
          },
          error: (e:any) => {

            this._create$?.unsubscribe();
          }
        });

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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._create$?.unsubscribe();
    this._update$?.unsubscribe();
    this._user$?.unsubscribe();
    this._role$?.unsubscribe();
  }
}
