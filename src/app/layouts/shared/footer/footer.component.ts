import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AgencyService } from 'src/app/services/admin-services/agency.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  private _updated$?: Subscription;

  year: number = new Date().getFullYear();

  private _frmBuilder = inject( UntypedFormBuilder );
  private _agencysvc = inject( AgencyService );
  private _st = inject( StorageService );

  private _saving = false;

  frmColor!: UntypedFormGroup;

  get values() { return this.frmColor.value; }
  get invalid() { return this.frmColor.invalid; }
  get saving() { return this._saving; }

  get showConf() { return this._st.isAdmin; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.frmColor = this._frmBuilder.group({
      htmlColor: [ '#364574', [ Validators.required ] ]
    });

  }

  onSubmit() {

    if( this.invalid || !this.showConf ) return;

    this._saving = true;
    this._updated$ = this._agencysvc.onUpdateColor( this.values )
    .subscribe({
      next: (response: any) => {


        this._saving = false;
        this._updated$?.unsubscribe();
      },
      error: (e) => {

        this._saving = false;
        this._updated$?.unsubscribe();
      }
    });

  }

  onChangeColor(  ) {

    console.log('value ::: ', this.values);

    document.getElementById('div-brand-box')!.style.backgroundColor = this.values.htmlColor;

    // .nav-item .nav-link.active {
    //   color: var(--clr-primary);
    //   font-weight: 600;
    // }

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._updated$?.unsubscribe();
  }

}
