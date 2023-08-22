import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICountry } from 'src/app/interfaces/admin-interfaces/country.interface';
import { ICustomerType } from 'src/app/interfaces/admin-interfaces/customer-type.interface';
import { ITimezone } from 'src/app/interfaces/admin-interfaces/timezone.interface';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { IPager, IPagerFilter } from 'src/app/interfaces/pager.interface';
import { IUser } from 'src/app/interfaces/segurity-interfaces/user.interface';
import { CustomerService } from 'src/app/services/admin-services/customer.service';
import { CountryService } from 'src/app/services/admin-services/country.service';
import { CustomerTypeService } from 'src/app/services/admin-services/customer-type.service';
import { TimezoneService } from 'src/app/services/admin-services/timezone.service';
import { PagerService } from 'src/app/services/pager.service';
import { UiService } from 'src/app/services/ui.service';
import { emailPatt, fullTextNumberPatt, fullTextPatt, postalCodePatt } from 'src/app/utils';
import { DepartmentClass } from 'src/app/classes/department.class';
import { ICustomer, IDepartment } from 'src/app/interfaces/admin-interfaces/customer.interface';
import { RateClass } from 'src/app/classes/rate.class';
import { INomenclature } from 'src/app/interfaces/nomenclature.interface';
import { NomenclatureService } from 'src/app/services/nomenclature.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  private _country$?: Subscription;
  private _timezone$?: Subscription;
  private _create$?: Subscription;
  private _update$?: Subscription;
  private _delete$?: Subscription;
  private _client$?: Subscription;
  private _clientById$?: Subscription;
  private _customertype$?: Subscription;
  private _calltype$?: Subscription;

  private _countrysvc = inject( CountryService );
  private _timezonesvc = inject( TimezoneService );
  private _customersvc = inject( CustomerService );
  private _customertypesvc = inject( CustomerTypeService );
  private _uisvc = inject( UiService );
  private _pagersvc = inject( PagerService );
  private _nomenclaturesvc = inject( NomenclatureService );

  countries: ICountry[] = [];
  timezones: ITimezone[] = [];
  customers: ICustomer[] = [];
  customerType: ICustomerType[] = [];

  department: DepartmentClass[] = [];

  frmCustomer!: UntypedFormGroup;
  frmFilter!: UntypedFormGroup;
  private _frmBuilder = inject( UntypedFormBuilder );

  private _loadingTimezone = false;
  private _saving = false;
  private _loadData = false;
  private _loading = false;
  private _id = '';
  private _total = 0

  rates: RateClass[] = [];
  calltype: INomenclature[] = [];

  paginate: IPager = {
    currentPage: 0,
    endPage: 1,
    pages: [],
    startPage: 1,
    totalPages: 0
  };

  get loadingTimezone() { return this._loadingTimezone; }
  get saving() { return this._saving; }
  get total() { return this._total; }
  get loadData() { return this._loadData; }
  get values() { return this.frmCustomer.value; }
  get valuesFilter():IPagerFilter { return this.frmFilter.value; }
  get currentPage() { return this.paginate.currentPage; }
  get invalid() { return this.frmCustomer.invalid; }
  get loading() { return this._loading; }
  get controls() { return this.frmCustomer.controls; }
  touched( field: string ) { return this.frmCustomer.get( field )?.touched; }

  get invalidDepartments() { return this.department.some( (e) => e.invalid ); }
  get invalidRates() { return this.rates.some( (e) => e.invalid ); }

  get counterRates(){ return this.rates.length; }
  get counterDepartments(){ return this.department.length; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.onBuildFrm();
    this.onGetCountries();

    this.onGetClients();
    this.onGetCustomerType();
    this.onLoadCallType();

  }

  onLoadCallType() {
    this._calltype$ = this._nomenclaturesvc.onGetCallType()
    .subscribe({
      next: (response) => {

        const { data } = response;

        this.calltype = data;

        this._calltype$?.unsubscribe();
      },
      error: (e) => {

        this._calltype$?.unsubscribe();
      }
    })
  }

  onBuildFrm() {
    this.frmCustomer = this._frmBuilder.group({
      customerName:   [ '', [ Validators.required, Validators.pattern( fullTextPatt ) ] ],
      email:          [ '', [ Validators.required, Validators.pattern( emailPatt ) ] ],
      phone:          [ '', [] ],
      address:        [ '', [ Validators.required, Validators.pattern( fullTextNumberPatt ) ] ],
      cityName:       [ '', [ Validators.required ] ],
      postalCode:     [ '', [ Validators.required, Validators.pattern( postalCodePatt ) ] ],
      countryCode:    [ null, [ Validators.required ] ],
      timzoneId:      [ null, [ Validators.required ] ],
      customertypeId: [ null, [ Validators.required ] ],
      departments:    [ [], [] ],
      rates:          [ [], [] ],
    });

    this.frmFilter = this._frmBuilder.group({
      limit:         [ 5, [] ],
      filter:        [ '', [] ],
      active:        [ false, [] ],
      order:         [ '', [] ],
    });

  }

  onGetCountries() {
    this._country$ = this._countrysvc.onFindAll()
    .subscribe((response) => {

      const { data, total } = response;

      this.countries = data;

      this._country$?.unsubscribe();
    });
  }

  onAddrate() {
    this.rates.push(
      new RateClass( null, '', 0 )
    );
  }

  onRemoveRate( record: RateClass ) {
    this.rates = this.rates.filter( (c) => c.auxId != record.auxId );
  }

  onAddDepartment() {

    this.department.push(
      new DepartmentClass( '', '' )
    );

  }

  onRemoveDepartment( campu: DepartmentClass ) {

    this.department = this.department.filter( (c) => c.auxId != campu.auxId );

  }

  onGetTimezones( data: ICountry ) {

    const { code2 } = data;

    this._loadingTimezone = true;
    this._timezone$ = this._timezonesvc.onFindAll( code2 )
    .subscribe((response) => {

      const { data, total } = response;

      this.timezones = data;
      this._loadingTimezone = false;

      this._timezone$?.unsubscribe();
    });
  }

  onGetCustomerType() {
    this._customertype$ = this._customertypesvc.onFindAll()
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        this.customerType = data;
        console.log('response ::: ', response);

        this._customertype$?.unsubscribe();
      },
      error: (e) => {

        this._customertype$?.unsubscribe();
      }
    });
  }

  onReset() {
    this.frmCustomer.reset();
    this._saving = false;
    this._loadData = false;
    this._id = '';
    this.department = [];
    this.rates = [];
    document.getElementById('btnCloseModal')?.click();
  }

  onSubmit() {
    if( this.invalid || this.saving ) return;

    this._saving = true;

    const departmentFinal = this.department.map( (e) => e.values );
    const ratesFinal = this.rates.map( (e) => e.values );


    this.frmCustomer.get('departments')?.setValue( departmentFinal );
    this.frmCustomer.get('rates')?.setValue( ratesFinal );

    this._uisvc.onShowLoading();

    if( !this._loadData ) {

      this._create$ = this._customersvc.onCreate( this.values )
      .subscribe({
        next: (response) => {

          this.onReset();
          this._saving = false;
          this._uisvc.onClose();
          this._uisvc.onShowAlert( 'Cliente creado exitosamente', EIconAlert.success );
          this.onGetClients( this.currentPage > 0 ? this.currentPage : 1 );


          this._create$?.unsubscribe();
        },
        error: (e) => {

          this._uisvc.onClose();
          this._saving = false;
          this._create$?.unsubscribe();
        }
      });

    } else {

      this._update$ = this._customersvc.onUpdate( this.values, this._id )
      .subscribe({
        next: (response) => {


          this._saving = false;
          this.onReset();
          this._uisvc.onClose();
          this._uisvc.onShowAlert( 'Cliente actualizado exitosamente', EIconAlert.success );
          this.onGetClients( this.currentPage );
          this._update$?.unsubscribe();
        },
        error: (e) => {

          this._uisvc.onClose();
          this._saving = false;
          this._update$?.unsubscribe();
        }
      });

    }

  }

  onGetClients( page = 1 ) {
    this._loading = true;
    this._client$ = this._customersvc.onFindAll( this.valuesFilter, page )
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        this.customers = data;
        this._total = total;

        this.paginate = this._pagersvc.getPager( total, page, this.valuesFilter.limit );

        this._loading = false;
        this._client$?.unsubscribe();
      },
      error: (e) => {

        this._loading = false;
        this._client$?.unsubscribe();
      }
    });
  }

  onLoadData( record: ICustomer ) {
    const { id } = record;

    this._clientById$ = this._customersvc.onFindById( id )
    .subscribe({
      next: (response) => {

        const { data } = response;

        console.log('data ::: ', data);

        this._loadData = true;
        this._id = id;
        this.frmCustomer.get('customerName')?.setValue( data.customerName );
        this.frmCustomer.get('email')?.setValue( data.email );
        this.frmCustomer.get('phone')?.setValue( data.phone );


        this.frmCustomer.get('address')?.setValue( data.address );
        this.frmCustomer.get('cityName')?.setValue( data.cityName );
        this.frmCustomer.get('postalCode')?.setValue( data.postalCode );
        this.frmCustomer.get('countryCode')?.setValue( data.countryCode );
        this.frmCustomer.get('timzoneId')?.setValue( data.timezone?.id );
        this.frmCustomer.get('customertypeId')?.setValue( data.customerType?.id );

        this.department = [];

        this.department = data.departments.map( (e) => {

          return new DepartmentClass(
            e.departmentName,
            e.accessCode,
            e.id
          );
        } );

        this.rates = [];

        this.rates = data.rates.map( (e) => {

          return new RateClass(
            null,
            e.type,
            +e.rate,
            e.id
          )
        } );


        // this.frmCustomer.get('departmentId')?.setValue( data.departmentId );

        const findCountry = this.countries.find( (e) => e.code == data.countryCode );

        if( data.timezone && findCountry ) {
          this.onGetTimezones( findCountry );
        }

        document.getElementById('btnShowModal')?.click();

        this._clientById$?.unsubscribe();
      },
      error: (e) => {

        this._clientById$?.unsubscribe();
      }
    });

  }

  onConfirm( record: ICustomer ) {
    const { id, customerName, status } = record;

    this._uisvc.onShowConfirm(`¿Está seguro de ${ status ? 'eliminar' : 'restaurar' } a: "${ customerName }" ?`)
    .then( (result) => {

      if( result.isConfirmed ) {
        this.onDeleteRole( id, status );
      }

    } );
  }

  onDeleteRole( id: string, status: boolean ) {

    this._uisvc.onShowLoading();

    this._delete$ = this._customersvc.onDelete( id )
    .subscribe({
      next: (response) => {

        this.onGetClients( this.currentPage );

        this._uisvc.onClose();
        this._uisvc.onShowAlert(`Cliente ${ status ? 'eliminada' : 'restaurada' } exitosamente`, EIconAlert.success);

        this._delete$?.unsubscribe();
      },
      error: (e) => {
        this._delete$?.unsubscribe();
      }
    })

  }

  //stan lee psw: 992358

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._create$?.unsubscribe();
    this._update$?.unsubscribe();
    this._delete$?.unsubscribe();
    this._country$?.unsubscribe();
    this._timezone$?.unsubscribe();
    this._client$?.unsubscribe();
    this._clientById$?.unsubscribe();
    this._customertype$?.unsubscribe();

  }

}
