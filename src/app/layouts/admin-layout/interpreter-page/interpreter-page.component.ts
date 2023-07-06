import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { ICountry } from 'src/app/interfaces/country.interface';
import { IPager, IPagerFilter } from 'src/app/interfaces/pager.interface';
import { ITimezone } from 'src/app/interfaces/timezone.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { CountryService } from 'src/app/services/country.service';
import { InterpreterService } from 'src/app/services/interpreter.service';
import { PagerService } from 'src/app/services/pager.service';
import { TimezoneService } from 'src/app/services/timezone.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-interpreter-page',
  templateUrl: './interpreter-page.component.html',
  styleUrls: ['./interpreter-page.component.scss']
})
export class InterpreterPageComponent {

  private _country$?: Subscription;
  private _timezone$?: Subscription;
  private _create$?: Subscription;
  private _update$?: Subscription;
  private _delete$?: Subscription;
  private _interpreter$?: Subscription;

  private _countrysvc = inject( CountryService );
  private _timezonesvc = inject( TimezoneService );
  private _interpretersvc = inject( InterpreterService );
  private _uisvc = inject( UiService );
  private _pagersvc = inject( PagerService );

  countries: ICountry[] = [];
  timezones: ITimezone[] = [];
  interpreters: IUser[] = [];

  frmUser!: UntypedFormGroup;
  frmFilter!: UntypedFormGroup;
  private _frmBuilder = inject( UntypedFormBuilder );

  private _loadingTimezone = false;
  private _saving = false;
  private _loadData = false;
  private _id = '';
  private _total = 0

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
  get values() { return this.frmUser.value; }
  get valuesFilter():IPagerFilter { return this.frmFilter.value; }

  get invalid() { return this.frmUser.invalid; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.onBuildFrm();
    this.onGetCountries();

    this.onGetInterpreters();

  }

  onBuildFrm() {
    this.frmUser = this._frmBuilder.group({
      name:     [ '', [ Validators.required ] ],
      surname:  [ '', [ Validators.required ] ],
      email:    [ '', [ Validators.required ] ],
      phone:    [ '', [ ] ],
      country:  [ null, [ Validators.required ] ],
      timezone: [ null, [ Validators.required ] ],
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

  onGetTimezones() {
    this._loadingTimezone = true;
    this._timezone$ = this._timezonesvc.onFindAll( this.values.country )
    .subscribe((response) => {

      const { data, total } = response;

      this.timezones = data;
      this._loadingTimezone = false;

      this._timezone$?.unsubscribe();
    });
  }

  onReset() {
    this.frmUser.reset();
    this._saving = false;
    document.getElementById('btnCloseModal')?.click();
  }

  onSubmit() {
    if( this.invalid || this.saving ) return;

    this._saving = true;

    if( !this._loadData ) {

      this._create$ = this._interpretersvc.onCreate( this.values )
      .subscribe({
        next: (response) => {

          this.onReset();
          this._saving = false;
          this._uisvc.onShowAlert( 'Intérprete creado exitosamente', EIconAlert.success );
          this._create$?.unsubscribe();
        },
        error: (e) => {

          this._saving = false;
          this._create$?.unsubscribe();
        }
      });

    } else {

      this._update$ = this._interpretersvc.onCreate( this.values )
      .subscribe({
        next: (response) => {


          this._saving = false;
          this.onReset();
          this._uisvc.onShowAlert( 'Intérprete actualizado exitosamente', EIconAlert.success );
          this._update$?.unsubscribe();
        },
        error: (e) => {

          this._saving = false;
          this._update$?.unsubscribe();
        }
      });

    }


  }

  onGetInterpreters( page = 1 ) {
    this._interpreter$ = this._interpretersvc.onFindAll( this.valuesFilter, page )
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        this.interpreters = data;
        this._total = total;

        this.paginate = this._pagersvc.getPager( total, page, this.valuesFilter.limit );

        this._interpreter$?.unsubscribe();
      },
      error: (e) => {

        this._interpreter$?.unsubscribe();
      }
    });
  }

  onLoadData( record: IUser ) {

  }

  onConfirm( record: IUser ) {

  }

  //stan lee psw: 992358

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._create$?.unsubscribe();
    this._update$?.unsubscribe();
    this._country$?.unsubscribe();
    this._timezone$?.unsubscribe();
    this._interpreter$?.unsubscribe();

  }

}
