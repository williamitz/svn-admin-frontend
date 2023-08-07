import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { ICountry } from 'src/app/interfaces/admin-interfaces/country.interface';
import { IOrganization } from 'src/app/interfaces/admin-interfaces/organization.interface';
import { IPager, IPagerFilter } from 'src/app/interfaces/pager.interface';
import { AgencyService } from 'src/app/services/admin-services/agency.service';
import { PagerService } from 'src/app/services/pager.service';
import { UiService } from 'src/app/services/ui.service';
import { decimalPatt, emailPatt, fullTextNumberPatt, fullTextPatt } from 'src/app/utils';
import { NomenclatureService } from 'src/app/services/nomenclature.service';
import { INomenclature } from 'src/app/interfaces/nomenclature.interface';
import { RateClass } from 'src/app/classes/rate.class';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { v4 as UUID } from 'uuid';
import { EUploadModule } from 'src/app/interfaces/uploadModule.enum';
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
  private _calltype$?: Subscription;


  // private _countrysvc      = inject( CountryService );
  private _pagersvc        = inject( PagerService );
  private _uisvc           = inject( UiService );
  private _utilsSvc           = inject( UtilsService );
  private _agencysvc = inject( AgencyService );
  private _firesvc = inject( FirebaseService );
  private _nomenclaturesvc = inject( NomenclatureService );
  private _frmBuilder      = inject( UntypedFormBuilder );

  private _loading = false;
  private _saving = false;
  private _loadData = false;
  private _total = 0
  private _organizationId?: string;
  private _urlLogo = './assets/images/No_Image.jpg';

  private _file?: File;

  frmOrganization!: UntypedFormGroup;
  frmFilter!: UntypedFormGroup;
  calltype: INomenclature[] = [];
  rates: RateClass[] = [];

  paginate: IPager = {
    currentPage: 0,
    endPage: 1,
    pages: [],
    startPage: 1,
    totalPages: 0
  };

  countries: ICountry[] = [];
  organizations: IOrganization[] = [];

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
  get invalidRates() { return this.rates.some( (e) => e.invalid ); }

  get urlLogo() { return this._urlLogo; }

  // get invalidDetail() { return this.campus.length > 0 ? this.campus.some( (e) => e.invalid ) : false ; }

  private get _currentPage() { return this.paginate.currentPage; }
  get counterRates(){ return this.rates.length; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.onBuildFrm();

    this.onGetOrganizations();

    this.onLoadCallType();

  }

  onBuildFrm() {

    this.frmOrganization = this._frmBuilder.group({
      bussinnesName:   [ '', [ Validators.required, Validators.pattern( fullTextPatt ) ] ],
      // document:        [ '', [ Validators.required, Validators.pattern( fullTextNumberPatt ) ] ],
      address:         [ '', [ Validators.required ] ],
      email:           [ null, [ Validators.required, Validators.pattern( emailPatt ) ] ],
      phone:           [ null, [] ],
      // costPerMinute:   [ null, [ Validators.required, Validators.pattern( decimalPatt ) ] ],
      rates:          [ [], [] ],
      logoUrl:          [ '', [] ],
      logoUrlSecure:          [ '', [] ],


    });

    this.frmFilter = this._frmBuilder.group({
      limit:         [ 5, [] ],
      filter:        [ '', [] ],
      active:        [ false, [] ],
      order:         [ '', [] ],
    });

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

  onAddrate() {
    this.rates.push(
      new RateClass( '', 0 )
    );
  }

  onRemoveRate( record: RateClass ) {
    this.rates = this.rates.filter( (c) => c.auxId != record.auxId );
  }

  onGetOrganizations( page = 1 ) {
    this._findAll$ = this._agencysvc.onFindAll( this.value, page )
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

  onReset() {

    this.frmOrganization.reset();
    this._organizationId = undefined;
    this._loadData = false;
    // this.campus = [];

  }

  onChangeFile( event: any ) {

    const files = event.target.files;

    const nombre = files.item(0)!.name.toUpperCase();
    const extension = nombre.split('.').pop();

    this._file = files.item(0);

    // themeAward.file = file.item(0);
    // themeAward.loadImg = true;

    // if ( themeAward.urlImg.includes('https') ) {
    //   themeAward.originImg = themeAward.storageName;
    // }

    const size = files.item(0)!.size / 1000000;

    if (!this._utilsSvc.onValidImg(extension!, size)) {
      this._uisvc.onShowAlert( 'Formato de logo inválido', EIconAlert.warning );
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any) => {
      this._urlLogo = event.target.result;
    };
    reader.readAsDataURL( files.item(0)! );
  }

  onLoadData( record: IOrganization ) {

    const { id } = record;

    this._organizationId = id;
    this._loadData = true;

    this._findById$ = this._agencysvc.onFindById( id )
    .subscribe({
      next: (response) => {

        const { data } = response;

        this.frmOrganization.get('bussinnesName')?.setValue(data.bussinnesName);
        this.frmOrganization.get('document')?.setValue(data.document);
        this.frmOrganization.get('address')?.setValue(data.address);
        this.frmOrganization.get('email')?.setValue(data.email);
        this.frmOrganization.get('phone')?.setValue(data.phone);
        this.frmOrganization.get('costPerMinute')?.setValue(data.costPerMinute);
        this.frmOrganization.get('logoUrl')?.setValue(data.logoUrl);
        this.frmOrganization.get('logoUrlSecure')?.setValue(data.logoUrlSecure);

        this._urlLogo = data.logoUrl == '' || !data.logoUrl  ? './assets/images/No_Image.jpg' : data.logoUrl;

        this.rates = [];

        this.rates = data.rates.map( (e) => {

          return new RateClass(
            e.type,
            +e.rate,
            e.id
          )
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

    this._delete$ = this._agencysvc.onDelete( id )
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

  async onSubmit() {

    if( this.invalid || this.saving || this.invalidRates ) return;

    this._saving = true;

    const ratesFinal = this.rates.map( (e) => e.values );
    this.frmOrganization.get('rates')?.setValue( ratesFinal );

    this._uisvc.onShowLoading();

    if( this._file ) {

      const urlOld = this._valueFrm.logoUrlSecure ?? '';

      if( urlOld && urlOld != '' ) {
        await this._firesvc.onDeleteFirebase( urlOld, EUploadModule.agency );
      }

      const logoUrlSecure = UUID() + '.png';

      const urlLogo = await this._firesvc.onUploadFirebase( this._file, logoUrlSecure, EUploadModule.agency );

      this.frmOrganization.get('logoUrlSecure')?.setValue( logoUrlSecure );
      this.frmOrganization.get('logoUrl')?.setValue(urlLogo);

    }

    if( !this.loadData ) {

      this._create$ = this._agencysvc.onCreate( this._valueFrm )
      .subscribe({
        next: (response) => {

          // console.log('response ::: ', response);

          this.onGetOrganizations( this._currentPage );
          this._saving = false;

          this._uisvc.onClose();

          this._uisvc.onShowAlert('Agency created!', EIconAlert.success);
          document.getElementById('btnCloseModal')?.click();

          this._create$?.unsubscribe();
        },
        error: async (e) => {

          if( this._file ) {
            await this._firesvc.onDeleteFirebase( this._valueFrm.logoUrlSecure, EUploadModule.agency );
          }

          this._create$?.unsubscribe();
        }
      });

    } else {

      this._update$ = this._agencysvc.onUpdate( this._valueFrm, this._organizationId! )
      .subscribe({
        next: (response) => {

          // console.log('response ::: ', response);

          this.onGetOrganizations( this._currentPage );
          this._saving = false;

          this._uisvc.onClose();
          this._uisvc.onShowAlert('Agency updated!', EIconAlert.success);
          document.getElementById('btnCloseModal')?.click();

          this._update$?.unsubscribe();
        },
        error: async (e) => {

          if( this._file ) {
            await this._firesvc.onDeleteFirebase( this._valueFrm.logoUrlSecure, EUploadModule.agency );
          }

          this._update$?.unsubscribe();
        }
      });

    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._calltype$?.unsubscribe();
    this._country$?.unsubscribe();
    this._create$?.unsubscribe();
    this._update$?.unsubscribe();
    this._delete$?.unsubscribe();
    this._findById$?.unsubscribe();
  }

}
