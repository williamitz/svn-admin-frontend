import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedLayoutModule } from '../shared/shared-layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { AdminLayoutRoutingModule } from './admin-layout.routing.module';
import { RouterModule } from '@angular/router';
import { ClientPageComponent } from './client-page/client-page.component';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { OrganizationPageComponent } from './organization-page/organization-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ScheduleInterpreterComponent } from './schedule-interpreter/schedule-interpreter.component';
import { NewassignmentInterpreterComponent } from './newassignment-interpreter/newassignment-interpreter.component';
import { OnsiteInterpreterComponent } from './onsite-interpreter/onsite-interpreter.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbTooltipModule, NgbDropdownModule, NgbTypeaheadModule, NgbAccordionModule, NgbProgressbarModule, NgbNavModule, NgbPaginationModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PoolAddInterpreterComponent } from './pool-add-interpreter/pool-add-interpreter.component';
import { PoolActivityInterpreterComponent } from './pool-activity-interpreter/pool-activity-interpreter.component';
import { ProfileInterpreterComponent } from './profile-interpreter/profile-interpreter.component';
import { InterpreterPageComponent } from './interpreter-page/interpreter-page.component';
import { NgxMaskDirective } from 'ngx-mask';
import { CustomerComponent } from './customer/customer.component';
import { InternalUserComponent } from './internal-user/internal-user.component';
import { BillingComponent } from './billing/billing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { QuickbooksComponent } from './quickbooks/quickbooks.component';
import { CallQueuesComponent } from './call-queues/call-queues.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { PortalInterprterComponent } from './portal-interprter/portal-interprter.component';
import { MyassignmetInterpreterComponent } from './myassignmet-interpreter/myassignmet-interpreter.component';

// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin
// ]);

@NgModule({
  // TODO: importar vistas
  declarations: [
    AdminLayoutComponent,
    HomePageComponent,
    ClientPageComponent,
    InterpreterPageComponent,
    OrganizationPageComponent,
    ScheduleInterpreterComponent,
    NewassignmentInterpreterComponent,
    OnsiteInterpreterComponent,
    PoolAddInterpreterComponent,
    PoolActivityInterpreterComponent,
    ProfileInterpreterComponent,
    CustomerComponent,
    InternalUserComponent,
    BillingComponent,
    InvoiceComponent,
    QuickbooksComponent,
    CallQueuesComponent,
    ProfileAccountComponent,
    PortalInterprterComponent,
    MyassignmetInterpreterComponent
  ],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ReactiveFormsModule,
    FeatherModule.pick(allIcons),
    AdminLayoutRoutingModule,
    WidgetsModule,
    RouterModule,
    PipesModule,

    NgSelectModule,
    NgbModalModule,

    // PickerModule,
    FullCalendarModule,
    // dayGridPlugin,
    // interactionPlugin,
    FlatpickrModule.forRoot(),

    NgbTooltipModule, NgbDropdownModule,
    NgbTypeaheadModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgxMaskDirective
  ]
})
export class AdminLayoutModule { }
