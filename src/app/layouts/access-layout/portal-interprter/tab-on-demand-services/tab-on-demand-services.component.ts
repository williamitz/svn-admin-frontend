import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as segurityActions from '../../../../redux/actions/segurity.actions';
import { Subscription } from 'rxjs';
import { InterpreterService } from 'src/app/services/admin-services/interpreter.service';
import { IAppState } from 'src/app/app.state';

@Component({
  selector: 'app-tab-on-demand-services',
  templateUrl: './tab-on-demand-services.component.html',
  styleUrls: ['./tab-on-demand-services.component.scss']
})
export class TabOnDemandServicesComponent {

  profileRating = 5;

  constructor(){}

}

