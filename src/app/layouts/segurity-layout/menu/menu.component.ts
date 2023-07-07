import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IMenu } from 'src/app/interfaces/menu.interface';
import { IPager, IPagerFilter } from 'src/app/interfaces/pager.interface';
import { MenuService } from 'src/app/services/menu.service';
import { NomenclatureService } from 'src/app/services/nomenclature.service';
import { PagerService } from 'src/app/services/pager.service';
import { UiService } from 'src/app/services/ui.service';
import { INomenclature } from '../../../interfaces/nomenclature.interface';
import { fullTextPatt, riIconPatt, translatePatt } from 'src/app/utils';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  private _list$?:   Subscription;
  private _listById$?:   Subscription;
  private _listPather$?:   Subscription;
  private _actions$?:   Subscription;
  private _create$?: Subscription;
  private _update$?: Subscription;
  private _delete$?: Subscription;

  private _uisvc =             inject( UiService );
  private _menusvc =           inject( MenuService );
  private _frmBuilder =        inject( UntypedFormBuilder );
  private _pagersvc =          inject( PagerService );
  private _nomenclaturesvc =   inject( NomenclatureService );
  // private _uisvc =   inject( UiService );
  private _loading = false;
  private _saving = false;
  private _loadData = false;
  private _total = 0
  private _ignore?: string;
  private _menuId?: string;

  frmFilter!: UntypedFormGroup;
  frmMenu!:   UntypedFormGroup;

  paginate: IPager = {
    currentPage: 0,
    endPage: 1,
    pages: [],
    startPage: 1,
    totalPages: 0
  };

  menus:   IMenu[] = [];
  pathers:  IMenu[] = [];
  actions: INomenclature[] = [];

  // errors( field: string ) { return this.frmMenu.controls[field].errors; }
  get controls() { return this.frmMenu.controls; }
  touched( field: string ) { return this.frmMenu.get( field )?.touched ?? false; }
  get loadData() { return this._loadData; }
  get loading() { return this._loading; }
  get saving() { return this._saving; }
  get total() { return this._total; }
  get counter() { return this.menus.length; }
  get value(): IPagerFilter { return this.frmFilter.value; }
  private get _valueFrm() { return this.frmMenu.value; }
  get haveTranslate() { return this._valueFrm.haveTranslate; }
  get invalid() { return this.frmMenu.invalid ?? false; }
  private get _currentPage() { return this.paginate.currentPage; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.onBuildFrm();
    this.onGetMenu();
    this.onGetPather();
    this.onGetActions();

  }

  onBuildFrm() {
    this.frmFilter = this._frmBuilder.group({
      limit:         [ 5, [] ],
      filter:        [ '', [] ],
      active:        [ false, [] ],
      order:         [ '', [] ],
    });

    this.frmMenu = this._frmBuilder.group({
      name:          [ '', [ Validators.required, Validators.pattern( fullTextPatt ), Validators.minLength(5) ] ],
      icon:          [ 'ri-checkbox-blank-circle-line', [ Validators.pattern( riIconPatt ) ] ],
      webUrl:        [ '', [] ],
      apiUrl:        [ '', [] ],
      patherMenuId:  [ null, [] ],
      actions:       [ null, [] ],
      hidden:        [ false, [] ],
      haveTranslate: [ false, [] ],
      translate:     [ '', [] ],
      order:         [ 0, [ Validators.required ] ],
    })
  }

  onGetMenu( page = 1 ) {

    this._list$ = this._menusvc.onFindAll( this.value, page )
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        console.log('response ::: ', response);

        this.menus = data;

        this._total = total;
        this.paginate = this._pagersvc.getPager( total, page, 5 );

        this._list$?.unsubscribe();

      },
      error: (e) => {

        this._list$?.unsubscribe();
      }
    });

  }

  onGetActions() {
    this._actions$ = this._nomenclaturesvc.onGetMenuActions()
    .subscribe( {
      next: (response) => {

        const { data, total } = response;

        this.actions = data;


        this._actions$?.unsubscribe();

      },
      error: (e) => {

        this._actions$?.unsubscribe();
      }
    } )
  }

  onGetPather() {
    this._listPather$ = this._menusvc.onFindAllPather( this.value.filter, this._ignore )
    .subscribe({
      next: (response) => {

        const { data } = response;

        console.log('response ::: ', response);

        this.pathers = data;

        this._listPather$?.unsubscribe();

      },
      error: (e) => {

        this._listPather$?.unsubscribe();
      }
    });
  }

  onReset() {
    this.frmMenu.get('translate')?.removeValidators( [ Validators.required, Validators.pattern( translatePatt ) ] );
    this.frmMenu.reset();
    this._menuId = undefined;
    this._loadData = false;
    document.getElementById('btnCloseModal')?.click();

  }

  onConfirm( record: IMenu ) {
    const { id, name, status } = record;

    this._uisvc.onShowConfirm(`¿Está seguro de ${ status ? 'eliminar' : 'restaurar' } el rol "${ name }" ?`)
    .then( (result) => {

      if( result.isConfirmed ) {
        this.onDeleteRole( id, status );
      }

    } );
  }

  onDeleteRole( id: string, status: boolean ) {

    this._uisvc.onShowLoading();

    this._delete$ = this._menusvc.onDelete( id )
    .subscribe({
      next: (response) => {

        // const rolefinded = this.roles.find( (r) => r.id == id );

        // if( rolefinded ) {
        //   rolefinded.status = !rolefinded.status;
        // }

        this.onGetMenu( this._currentPage );

        this._uisvc.onClose();
        this._uisvc.onShowAlert(`Menú ${ status ? 'eliminado' : 'restaurado' } exitosamente`, EIconAlert.success);

        this._delete$?.unsubscribe();
      },
      error: (e) => {
        this._delete$?.unsubscribe();
      }
    })

  }

  onSubmit() {

    if( this.invalid || this.saving ) return;

    this._saving = true;
    if( !this.loadData ) {

      this._create$ = this._menusvc.onCreate( this._valueFrm )
      .subscribe({
        next: (response) => {

          console.log('response ::: ', response);
          this.onGetMenu( this._currentPage );
          this.onReset();
          this._saving = false;
          this._uisvc.onShowAlert(`Menú creado exitosamente`, EIconAlert.success);

          this._saving = false;
          this._create$?.unsubscribe();
        },
        error: (e) => {

          this._saving = false;
          this._create$?.unsubscribe();
        }
      });

    } else {

      this._update$ = this._menusvc.onUpdate( this._valueFrm, this._menuId! )
      .subscribe({
        next: (response) => {

          console.log('response ::: ', response);
          this.onGetMenu( this._currentPage );
          this.onReset();
          this._uisvc.onShowAlert(`Menú actualizado exitosamente`, EIconAlert.success);
          this._saving = false;
          this._update$?.unsubscribe();
        },
        error: (e) => {

          this._saving = false;
          this._update$?.unsubscribe();
        }
      });

    }

  }

  onLoadData( record: IMenu ) {

    const { id } = record;

    this._menuId = id;

    this._uisvc.onShowLoading();

    this._listById$ = this._menusvc.onFindById( this._menuId! )
    .subscribe({
      next: (response) => {

        const { data } = response;

        this.frmMenu.get('name')?.setValue(data.name);
        this.frmMenu.get('icon')?.setValue(data.icon);
        this.frmMenu.get('apiUrl')?.setValue(data.apiUrl);
        this.frmMenu.get('webUrl')?.setValue(data.webUrl);
        this.frmMenu.get('hidden')?.setValue(data.hidden);
        this.frmMenu.get('patherMenuId')?.setValue(data.patherMenuId);
        this.frmMenu.get('haveTranslate')?.setValue(data.haveTranslate);
        this.frmMenu.get('translate')?.setValue(data.translate);
        this.frmMenu.get('actions')?.setValue(data.actions);
        this.frmMenu.get('order')?.setValue(data.order);


        console.log('response ::: ', response);
        this._loadData = true;
        this._uisvc.onClose();
        this._listById$?.unsubscribe();
      },
      error: (e) => {

        this._listById$?.unsubscribe();
      }
    })

  }

  onHaveTranslate() {

    const haveTranslate = this._valueFrm.haveTranslate;

    if( haveTranslate ) {
      this.frmMenu.get('translate')?.addValidators( [ Validators.required, Validators.pattern( translatePatt ) ] );
    } else {
      this.frmMenu.get('translate')?.removeValidators( [ Validators.required, Validators.pattern( translatePatt ) ] );
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._list$?.unsubscribe();
    this._listPather$?.unsubscribe();
    this._actions$?.unsubscribe();
    this._create$?.unsubscribe();
    this._update$?.unsubscribe();
  }

}
