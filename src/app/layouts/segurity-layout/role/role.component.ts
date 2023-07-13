import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { IPager, IPagerFilter } from 'src/app/interfaces/pager.interface';
import { IRole } from 'src/app/interfaces/segurity-interfaces/role.interface';
import { PagerService } from 'src/app/services/pager.service';
import { RoleService } from 'src/app/services/segurity-services/role.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  private _list$?: Subscription;
  private _delete$?: Subscription;

  private _uisvc = inject( UiService );
  private _rolesvc = inject( RoleService );
  private _pagersvc = inject( PagerService );
  private _frmBuilder = inject( UntypedFormBuilder );

  private _loading = false;
  private _total = 0
  roles: IRole[] = [];

  paginate: IPager = {
    currentPage: 0,
    endPage: 1,
    pages: [],
    startPage: 1,
    totalPages: 0
  };

  frmFilter!: UntypedFormGroup;


  get loading() { return this._loading; }
  get counter() { return this.roles.length; }
  get total() { return this._total; }
  get value(): IPagerFilter { return this.frmFilter.value; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.onBuildFrm();

    this.onGetRole();

  }

  onBuildFrm() {
    this.frmFilter = this._frmBuilder.group({

      limit:         [ 5, [] ],
      filter:        [ '', [] ],
      active:        [ false, [] ],
      order:         [ '', [] ],

    });
  }

  onGetRole( page = 1 ) {

    this._loading = true;
    this._list$ = this._rolesvc.onFindAll( this.value, page )
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        this.roles = data;
        this._total = total;
        this.paginate = this._pagersvc.getPager( total, page, 5 );

        console.log('response ::: ', response);

        this._loading = false;
        this._list$?.unsubscribe();
      },
      error: (e) => {

        this._loading = false;
        this._list$?.unsubscribe();
      }
    })

  }

  onConfirm( role: IRole ) {
    const { id, name, status } = role;

    this._uisvc.onShowConfirm(`¿Está seguro de ${ status ? 'eliminar' : 'restaurar' } el rol "${ name }" ?`)
    .then( (result) => {

      if( result.isConfirmed ) {
        this.onDeleteRole( id, status );
      }

    } );
  }

  onDeleteRole( id: string, status: boolean ) {

    this._uisvc.onShowLoading();

    this._delete$ = this._rolesvc.onDelete( id )
    .subscribe({
      next: (response) => {

        // const rolefinded = this.roles.find( (r) => r.id == id );

        // if( rolefinded ) {
        //   rolefinded.status = !rolefinded.status;
        // }

        this.onGetRole( this.paginate.currentPage );

        this._uisvc.onClose();
        this._uisvc.onShowAlert(`Rol ${ status ? 'eliminado' : 'restaurado' }`, EIconAlert.success)

        this._delete$?.unsubscribe();
      },
      error: (e) => {
        this._delete$?.unsubscribe();
      }
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._list$?.unsubscribe();
    this._delete$?.unsubscribe();

  }

}
