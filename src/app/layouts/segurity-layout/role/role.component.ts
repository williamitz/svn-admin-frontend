import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPager, IPagerFilter } from 'src/app/interfaces/pager.interface';
import { IRole } from 'src/app/interfaces/role.interface';
import { PagerService } from 'src/app/services/pager.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  private _list$?: Subscription;

  private _rolesvc = inject( RoleService );
  private _pagersvc = inject( PagerService );
  private _frmBuilder = inject( UntypedFormBuilder );

  private _loading = false;

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

        this.paginate = this._pagersvc.getPager( total, page, 5 );

        console.log('response ::: ', response);

        this._loading = false;
      },
      error: (e) => {

        this._loading = false;
      }
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
