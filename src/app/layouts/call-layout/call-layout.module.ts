import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallLayoutComponent } from './call-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CallLayoutRoutingModule } from './call-layout.routing.module';
import { SharedLayoutModule } from '../shared/shared-layout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgxMaskDirective } from 'ngx-mask';
import { ConnectNowComponent } from './connect-now/connect-now.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CallReportComponent } from './call-report/call-report.component';
import { OpiCallComponent } from './opi-call/opi-call.component';
import { CallHistoryComponent } from './call-history/call-history.component';



@NgModule({
  declarations: [
    CallLayoutComponent,
    HomePageComponent,
    ConnectNowComponent,
    CallReportComponent,
    OpiCallComponent,
    CallHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

    NgSelectModule,
    NgbNavModule,
    FeatherModule.pick(allIcons),
    NgxMaskDirective,

    CallLayoutRoutingModule,

    RouterModule
  ]
})
export class CallLayoutModule { }
