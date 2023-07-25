import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';
import { ScheduleInterpreterComponent } from './schedule-interpreter/schedule-interpreter.component';
import { NewassignmentInterpreterComponent } from './newassignment-interpreter/newassignment-interpreter.component';
import { OnsiteInterpreterComponent } from './onsite-interpreter/onsite-interpreter.component';
import { PoolAddInterpreterComponent } from './pool-add-interpreter/pool-add-interpreter.component';
import { PoolActivityInterpreterComponent } from './pool-activity-interpreter/pool-activity-interpreter.component';
import { ProfileInterpreterComponent } from './profile-interpreter/profile-interpreter.component';
import { InterpreterPageComponent } from './interpreter-page/interpreter-page.component';
import { CustomerComponent } from './customer/customer.component';
import { InternalUserComponent } from './internal-user/internal-user.component';
import { BillingComponent } from './billing/billing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { QuickbooksComponent } from './quickbooks/quickbooks.component';
import { CallQueuesComponent } from './call-queues/call-queues.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { PortalInterprterComponent } from './portal-interprter/portal-interprter.component';
import { MyassignmetInterpreterComponent } from './myassignmet-interpreter/myassignmet-interpreter.component';

// TODO: crear rutas
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'interpreters', component: InterpreterPageComponent },
  { path: 'shedule', component: ScheduleInterpreterComponent },
  { path: 'new-assignment-interpreter', component: NewassignmentInterpreterComponent },
  { path: 'onsite-interpreter', component: OnsiteInterpreterComponent },
  { path: 'pool-interpreter', component: PoolAddInterpreterComponent },
  { path: 'pool-activity-interpreter', component: PoolActivityInterpreterComponent },
  { path: 'profile-interpreter/:id', component: ProfileInterpreterComponent },
  { path: 'my-profile', component: ProfileInterpreterComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'internal-user', component: InternalUserComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'quickbooks', component: QuickbooksComponent },
  { path: 'call-queues', component: CallQueuesComponent },
  { path: 'profile-account', component: ProfileAccountComponent },
  { path: 'agencies', component: OrganizationPageComponent },
  { path: 'portal-interpreter', component: PortalInterprterComponent },
  { path: 'my-assignments', component: MyassignmetInterpreterComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutesModule {}
