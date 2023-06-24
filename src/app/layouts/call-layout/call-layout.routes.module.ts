import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';
import { ConnectNowComponent } from './connect-now/connect-now.component';
import { CallReportComponent } from './call-report/call-report.component';

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
  { path: '**', component: NotFoundPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallLayoutRoutesModule {}
