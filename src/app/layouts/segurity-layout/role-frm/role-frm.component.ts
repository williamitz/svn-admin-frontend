import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/segurity-services/role.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { IMenuRole } from 'src/app/interfaces/segurity-interfaces/role.interface';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { codePatt, fullTextPatt } from 'src/app/utils';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';

@Component({
  selector: 'app-role-frm',
  templateUrl: './role-frm.component.html',
  styleUrls: ['./role-frm.component.scss']
})
export class RoleFrmComponent {

  private _role$?:   Subscription;
  private _create$?: Subscription;
  private _update$?: Subscription;
  private _load$?:   Subscription;

  private _activateRoute = inject( ActivatedRoute );
  private _rolesvc = inject( RoleService );
  private _uisvc = inject( UiService );
  private _frmBuilder = inject( UntypedFormBuilder );
  private _router = inject( Router );
  private _roleId?: string;
  private _toUpdate = false;

  invalidAllow$ = signal<boolean>( true );

  private _menus: IMenuRole[] = [];
  private _loading = false;
  private _saving = false;

  get menus(){ return this._menus };
  get loading(){ return this._loading };
  get saving(){ return this._saving };
  get toUpdate(){ return this._toUpdate };
  private get _values() { return this.frmRole.value; }

  frmRole!: UntypedFormGroup;

  get controls() { return this.frmRole.controls }
  touched( field: string ) { return this.frmRole.get(field)?.touched ?? false }

  get invalid() {
    return this.frmRole.invalid;
  }

  onInvalidAllows( menu?: IMenuRole ) {


    if( menu ) {

      if( !menu.selected ) {

        menu.actions = menu.actions.map( (a) => {

          return { selected: false, action: a.action }
        } );
      }

    }

    const haveSelected = this._menus.some( (e) => e.children?.some( (c) => c.selected || e.selected ) );

    let allowValid = true;

    this._menus.filter( (e) => e.children?.some( (c) => c.selected ) || e.selected )
    .forEach( (e) => {

      // console.log('e ::: ', e);

      if( e.haveChildren ) {

        e.children?.forEach( (c) => {

          if( c.selected ){
            const haveAction = c.actions.some( (a) => a.selected );

            if( !haveAction ) allowValid = false;

          }

        } );

      }
      // else {

      //   const haveAction = e.actions?.some( (a) => a.selected );

      //   if( !haveAction ) allowValid = false;
      // }

    });

    // console.log('haveSelected ::: ', haveSelected);
    // console.log('allowValid ::: ', allowValid);

    // return haveSelected && allowValid ? false : true;

    this.invalidAllow$.set( haveSelected && allowValid );
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.onBuildFrm();

    this._roleId = this._activateRoute.snapshot.paramMap.get('id') ?? undefined;

    this._toUpdate = this._roleId ? true : false;

    this._onGetMenusAll();

  }

  onBuildFrm() {

    this.frmRole = this._frmBuilder.group({
      code:         ['', [ Validators.required, Validators.pattern( codePatt ), Validators.minLength(4) ]],
      name:         ['', [ Validators.required, Validators.pattern( fullTextPatt ), Validators.minLength(5) ]],
      description:  ['', [ Validators.pattern( fullTextPatt ) ]],
      allows:       [ [], [] ]
    });

  }

  private _onGetMenusAll() {

    this._loading = true;
    this._uisvc.onShowLoading();

    this._role$ = this._rolesvc.onGetMenus()
    .subscribe( (response) => {

      this._loading = false;
      this._menus = response.data;

      console.log('menus ::: ', this._menus);

      this._uisvc.onClose();

      this._role$?.unsubscribe();

      if( this.toUpdate ) {

        this._onLoadData();

      }

    });

  }

  private _onLoadData() {

    this._load$ = this._rolesvc.onFindById( this._roleId! )
    .subscribe({
      next: (response) => {

        const { code, name, description, roleMenuAllow } = response.data;

        this.frmRole.get('code')?.setValue(code);
        this.frmRole.get('name')?.setValue(name);
        this.frmRole.get('description')?.setValue(description);
        console.log('response ::: ', response);

        roleMenuAllow.forEach( (e) => {

          console.log('roleMenuAllow.forEach');

          if( !e.menu.patherMenuId ) {
            const pather = this._menus.find( (m) => m.id == e.menu.id );

            if( pather ) {
              pather.selected = true;
              pather.idRoleMenuAllow = e.id;
              pather.actions = pather?.actions.map( (a) => {
                // a.id = e.id;
                if( e.actions.includes( a.action ) ) a.selected = true;

                return a;
              } );

            }

          } else {

            // const children = this._menus.find( (m) => m.id == e.menu.id );

            const pather = this._menus.find( (m) => m.id == e.menu.patherMenuId );

            if( pather ) {
              pather.selected = true;
              pather
              ?.children?.forEach( (c) => {

                console.log('children.forEach');

                if( c.id == e.menu.id ) {

                  c.selected = true;
                  c.idRoleMenuAllow = e.id;
                  // c.id = e.id;
                  c.actions = c?.actions.map( (a) => {

                    if( e.actions.includes( a.action ) ) a.selected = true;

                    return a;
                  } );
                }

              } );
            }

          }

        });

        console.log('this._menus ::: ', this._menus);

        this._load$?.unsubscribe();
      },
      error: (e) => {

        this._load$?.unsubscribe();
      }
    });

  }

  private get _onGetAllowsBody() {
    let allowBody: { id?: string; menu: string; actions?: string[]}[] = [];

    console.log('this._menus ::: ', this._menus);

    this._menus.forEach( (m) => {

      // m.selected ||
      if(  m.children?.some( (c) => c.selected ) || m.actions?.some( (c) => c.selected ) ) {

        if( !m.children || m.children.length == 0 ) {

          const finalActions = m.actions.filter( (e) => e.selected );

          allowBody.push({
            id: m.idRoleMenuAllow,
            menu: m.id,
            actions: finalActions.map( (a) => a.action )
          });

        } else {

          const childrenSelects = m.children?.filter( (c) => c.selected );

          if( m.selected ) {
            allowBody.push({
              id: m?.idRoleMenuAllow,
              menu: m.id,
              actions: []
            });
          }

          childrenSelects?.forEach( (e) => {

            const finalActions = e.actions.filter( (e) => e.selected );

            allowBody.push({
              id: e?.idRoleMenuAllow,
              menu: e.id,
              actions: finalActions.map( (a) => a.action )
            });

          } );

        }

      }

    } );

    return allowBody ;
  }

  onSubmit() {

    if( this._saving || this.invalid  ) return;

    // {
    //   "menu": "1c3b3409-da92-46d1-9b7b-71f91b56c760",
    //   "actions": ["INSERT", "UPDATE", "LIST"]
    // },

    const allowBody = this._onGetAllowsBody;

    console.log('allowBody ::: ', allowBody);
    // debugger;

    this.frmRole.get('allows')?.setValue( allowBody );

    this._saving = true;

    if( !this.toUpdate ) {

      this._create$ = this._rolesvc.onCreate( this._values )
      .subscribe({
        next: (response) => {

          console.log('response ::: ', response);

          this._uisvc.onShowAlert('Rol creado exitosamente!', EIconAlert.success);
          this._saving = false;
          this._router.navigateByUrl('/segurity/role');
          this._create$?.unsubscribe();
        },
        error: (e) => {

          this._saving = false;
          this._create$?.unsubscribe();
        }
      });

    } else {

      console.log('toupdate ::: ');

      this._update$ = this._rolesvc.onUpdate( this._roleId!, this._values )
      .subscribe({
        next: (response) => {

          console.log('response ::: ', response);

          this._uisvc.onShowAlert('Rol actualizado exitosamente!', EIconAlert.success);
          this._saving = false;
          this._router.navigateByUrl('/segurity/role');
          this._update$?.unsubscribe();
        },
        error: (e) => {

          this._saving = false;
          this._update$?.unsubscribe();
        }
      });

    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._role$?.unsubscribe();
    this._create$?.unsubscribe();
    this._load$?.unsubscribe();

  }

}
