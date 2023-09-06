import { Component, Input, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfficeHourClass } from 'src/app/classes/office-hours.class';
import { OfficeHour } from 'src/app/interfaces/admin-interfaces/profile.interface';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { INomenclature } from 'src/app/interfaces/nomenclature.interface';
import { InterpreterService } from 'src/app/services/admin-services/interpreter.service';
import { NomenclatureService } from 'src/app/services/nomenclature.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-interpreter-services',
  templateUrl: './interpreter-services.component.html',
  styleUrls: ['./interpreter-services.component.scss']
})
export class InterpreterServicesComponent {

  private _update$?: Subscription;
  private _service$?: Subscription;

  @Input() id?: string;
  @Input() officeHours: OfficeHourClass[] = [];

  @Input() services: string[] = [];

  private _uisvc = inject( UiService );
  private _nomenclaturesvc = inject( NomenclatureService );

  servicesType: INomenclature[] = [];

  // service-type

  saving = false;

  private _interpretersvc = inject( InterpreterService );

  // get officeHourVal() { return this.officeHour; }
  get invalid() {
    return this.officeHours.some( (e) => e.invalid );
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.onGetServicesType();

  }

  onGetServicesType() {

    this._service$ = this._nomenclaturesvc.onGetServicesType()
    .subscribe({
      next: (response) => {

        this.servicesType = response.data;

        setTimeout(() => {

          this.servicesType.forEach( (e) => {

            if( this.services.includes( e.value ) ) {
              e.select = true;
            }

          } );

        }, 1000);

      },
      error: (e) => {

      }
    });

  }

  onSumit() {

    if( this.saving ) return;

    this.saving = true;
    const officeHours = this.officeHours
    .filter( (i) => i.checked.value )
    .map( (e) => e.values );

    const services = this.servicesType
    .filter( (e) => e.select )
    .map( (e) => e.value );


    this._update$ = this._interpretersvc.onUpdateOfficeHours( this.id ?? 'xd', {officeHours, services} )
    .subscribe({
      next: (response) => {

        console.log('response ::: ', response);

        this._uisvc.onShowAlert('Profile Update', EIconAlert.success );

        this.saving = false;
        this._update$?.unsubscribe();
      },
      error: (e) => {

        this.saving = false;
        this._update$?.unsubscribe();
      }
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.


    this._update$?.unsubscribe();

  }

}
