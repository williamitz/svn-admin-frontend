import { Component, Input, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfficeHourClass } from 'src/app/classes/office-hours.class';
import { OfficeHour } from 'src/app/interfaces/admin-interfaces/profile.interface';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { InterpreterService } from 'src/app/services/admin-services/interpreter.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-interpreter-services',
  templateUrl: './interpreter-services.component.html',
  styleUrls: ['./interpreter-services.component.scss']
})
export class InterpreterServicesComponent {

  private _update$?: Subscription;

  @Input() id?: string;
  @Input() officeHours: OfficeHourClass[] = [];

  private _uisvc = inject( UiService );

  saving = false;

  private _interpretersvc = inject( InterpreterService );

  // get officeHourVal() { return this.officeHour; }
  get invalid() {
    return this.officeHours.some( (e) => e.invalid );
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  onSumit() {

    if( this.saving ) return;

    this.saving = true;
    const officeHours = this.officeHours
    .filter( (i) => i.checked.value )
    .map( (e) => e.values );

    this._update$ = this._interpretersvc.onUpdateOfficeHours( this.id ?? 'xd', {officeHours} )
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
