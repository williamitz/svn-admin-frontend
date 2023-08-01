import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';
import { ConnectNowComponent } from './connect-now/connect-now.component';
import { CallReportComponent } from './call-report/call-report.component';
import { OpiCallComponent } from './opi-call/opi-call.component';
import { CallHistoryComponent } from './call-history/call-history.component';
import { CallHandlingComponent } from './call-handling/call-handling.component';
import { CallHandlingCustomerComponent } from './call-handling-customer/call-handling-customer.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'connectNow',
    component: ConnectNowComponent,
    // title: 'Conexion ahora'
  },
  {
    path: 'callReport',
    component: CallReportComponent,
    // title: 'Conexion ahora'
  },
  {
    path: 'opi-call', component: OpiCallComponent
  },
  {
    path: 'call-history', component: CallHistoryComponent
  },
  {
    path: 'call-handling', component: CallHandlingComponent
  },
  {
    path: 'call-handling-customer', component: CallHandlingCustomerComponent
  },
  { path: '**', component: NotFoundPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallLayoutRoutesModule { }
