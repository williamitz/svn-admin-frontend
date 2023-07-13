import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CampusClass } from 'src/app/classes/campus.class';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { ICountry } from 'src/app/interfaces/country.interface';
import { IOrganization } from 'src/app/interfaces/organization.interface';
import { IPager, IPagerFilter } from 'src/app/interfaces/pager.interface';
import { OrganizationService } from 'src/app/services/organization.service';
import { PagerService } from 'src/app/services/pager.service';
import { UiService } from 'src/app/services/ui.service';
import { decimalPatt, fullTextNumberPatt, fullTextPatt } from 'src/app/utils';
// import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent {

  private _country$?: Subscription;
  private _findAll$?: Subscription;
  private _findById$?: Subscription;
  private _create$?: Subscription;
  private _update$?: Subscription;
  private _delete$?: Subscription;

  // private _countrysvc      = inject( CountryService );
  private _pagersvc        = inject( PagerService );
  private _uisvc           = inject( UiService );
  private _organizationsvc = inject( OrganizationService );

  private _frmBuilder      = inject( UntypedFormBuilder );

  private _loading = false;
  private _saving = false;
  private _loadData = false;
  private _total = 0
  private _organizationId?: string;

  frmOrganization!: UntypedFormGroup;
  frmFilter!: UntypedFormGroup;

  paginate: IPager = {
    currentPage: 0,
    endPage: 1,
    pages: [],
    startPage: 1,
    totalPages: 0
  };

  countries: ICountry[] = [];
  organizations: IOrganization[] = [];

  campus: CampusClass[] = [];

  get controls() { return this.frmOrganization.controls; }
  touched( field: string ) { return this.frmOrganization.get( field )?.touched; }
  get loadData() { return this._loadData; }
  get loading() { return this._loading; }
  get saving() { return this._saving; }
  get total() { return this._total; }
  get counter() { return this.organizations.length; }
  get value(): IPagerFilter { return this.frmFilter.value; }
  private get _valueFrm() { return this.frmOrganization.value; }
  get invalid() { return this.frmOrganization.invalid ?? false; }

  get invalidDetail() { return this.campus.length > 0 ? this.campus.some( (e) => e.invalid ) : false ; }

  private get _currentPage() { return this.paginate.currentPage; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.onBuildFrm();

    this.onGetOrganizations();

  }

  onBuildFrm() {

    this.frmOrganization = this._frmBuilder.group({
      bussinnesName:   [ '', [ Validators.required, Validators.pattern( fullTextPatt ) ] ],
      document:        [ '', [ Validators.required, Validators.pattern( fullTextNumberPatt ) ] ],
      address:         [ '', [] ],
      email:           [ null, [] ],
      phone:           [ null, [] ],
      costPerMinute:   [ null, [ Validators.required, Validators.pattern( decimalPatt ) ] ],
      campus:          [ [], [] ],
      // removeTemp:      [ [], [] ]
    });

    this.frmFilter = this._frmBuilder.group({
      limit:         [ 5, [] ],
      filter:        [ '', [] ],
      active:        [ false, [] ],
      order:         [ '', [] ],
    });

  }

  onGetOrganizations( page = 1 ) {
    this._findAll$ = this._organizationsvc.onFindAll( this.value, page )
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        this.organizations  = data;
        this._total         = total;
        this.paginate       = this._pagersvc.getPager( total, page, this.value.limit );

        this._findAll$?.unsubscribe();
      },
      error: (e) => {

        this._findAll$?.unsubscribe();
      }
    });
  }

  // onListCountry() {
  //   this._country$ = this._countrysvc.onFindAll(0)
  //   .subscribe({
  //     next: (response) => {

  //       const { data, total } = response;

  //       this.countries = data;

  //       console.log('response ::: ', response);

  //       this._country$?.unsubscribe();
  //     },
  //     error: (e) => {

  //       this._country$?.unsubscribe();
  //     }
  //   })
  // }

  onReset() {

    this.frmOrganization.reset();
    this._organizationId = undefined;
    this._loadData = false;
    this.campus = [];

  }

  onAddDepartment() {

    this.campus.push(
      new CampusClass( '', '' )
    );

  }

  onLoadData( record: IOrganization ) {

    const { id } = record;

    this._organizationId = id;
    this._loadData = true;

    this._findById$ = this._organizationsvc.onFindById( id )
    .subscribe({
      next: (response) => {

        const { data } = response;

        this.frmOrganization.get('bussinnesName')?.setValue(data.bussinnesName);
        this.frmOrganization.get('document')?.setValue(data.document);
        this.frmOrganization.get('address')?.setValue(data.address);
        this.frmOrganization.get('email')?.setValue(data.email);
        this.frmOrganization.get('phone')?.setValue(data.phone);
        this.frmOrganization.get('costPerMinute')?.setValue(data.costPerMinute);
        // this.frmOrganization.get('country')?.setValue(data.country.id);

        this.campus = [];

        this.campus = data.campus.map( (e) => {

          return new CampusClass(
            e.campusName,
            e.city,
            e.address ??  undefined,
            e.id
          );
        } );

        this._findById$?.unsubscribe();
      },
      error: (e) => {

        this._findById$?.unsubscribe();
      }
    });

  }

  onConfirm( record: IOrganization ) {
    const { id, bussinnesName, status } = record;

    this._uisvc.onShowConfirm(`¿Está seguro de ${ status ? 'eliminar' : 'restaurar' } la agencia "${ bussinnesName }" ?`)
    .then( (result) => {

      if( result.isConfirmed ) {
        this.onDeleteRole( id, status );
      }

    } );
  }

  onDeleteRole( id: string, status: boolean ) {

    this._uisvc.onShowLoading();

    this._delete$ = this._organizationsvc.onDelete( id )
    .subscribe({
      next: (response) => {


        this.onGetOrganizations( this._currentPage );

        this._uisvc.onClose();
        this._uisvc.onShowAlert(`Agencia ${ status ? 'eliminada' : 'restaurada' } exitosamente`, EIconAlert.success);

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

    const campus = this.campus.map( (e) => e.values );

    this.frmOrganization.get('campus')?.setValue( campus );

    if( !this.loadData ) {

      this._create$ = this._organizationsvc.onCreate( this._valueFrm )
      .subscribe({
        next: (response) => {

          // console.log('response ::: ', response);

          this.onGetOrganizations( this._currentPage );
          this._saving = false;
          document.getElementById('btnCloseModal')?.click();

          this._create$?.unsubscribe();
        },
        error: (e) => {

          this._create$?.unsubscribe();
        }
      });

    } else {

      this._update$ = this._organizationsvc.onUpdate( this._valueFrm, this._organizationId! )
      .subscribe({
        next: (response) => {

          // console.log('response ::: ', response);

          this.onGetOrganizations( this._currentPage );
          this._saving = false;
          document.getElementById('btnCloseModal')?.click();

          this._update$?.unsubscribe();
        },
        error: (e) => {

          this._update$?.unsubscribe();
        }
      });

    }

  }

  onRemoveCampus( campu: CampusClass ) {

    this.campus = this.campus.filter( (c) => c.auxId != campu.auxId );

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._country$?.unsubscribe();
    this._create$?.unsubscribe();
    this._update$?.unsubscribe();
    this._delete$?.unsubscribe();
    this._findById$?.unsubscribe();
  }

}
