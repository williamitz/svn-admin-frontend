import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { IMenuRole } from 'src/app/interfaces/role.interface';

@Component({
  selector: 'app-role-frm',
  templateUrl: './role-frm.component.html',
  styleUrls: ['./role-frm.component.scss']
})
export class RoleFrmComponent {

  private _role$?: Subscription;

  private _activateRoute = inject( ActivatedRoute );
  private _rolesvc = inject( RoleService );
  private _uisvc = inject( UiService );
  private _roleId?: string;

  private _menus: IMenuRole[] = [];
  private _loading = false;

  get menus(){ return this._menus };
  get loading(){ return this._loading };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this._roleId = this._activateRoute.snapshot.paramMap.get('id') ?? undefined;

    this.onGetMenusAll();

  }


  onGetMenusAll() {

    this._loading = true;
    this._uisvc.onShowLoading();

    this._role$ = this._rolesvc.onGetMenus()
    .subscribe( (response) => {

      this._loading = false;
      this._menus = response.data;

      this._uisvc.onClose();

      this._role$?.unsubscribe();

    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._role$?.unsubscribe();

  }

}
