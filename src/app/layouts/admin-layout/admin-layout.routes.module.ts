import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';
import { ScheduleInterpreterComponent } from './schedule-interpreter/schedule-interpreter.component';
import { NewassignmentInterpreterComponent } from './newassignment-interpreter/newassignment-interpreter.component';
import { OnsiteInterpreterComponent } from './onsite-interpreter/onsite-interpreter.component';

// TODO: crear rutas
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'clients', component: ClientPageComponent },
  { path: 'schedule-interpreter', component: ScheduleInterpreterComponent },
  { path: 'new-assignment-interpreter', component: NewassignmentInterpreterComponent },
  { path: 'onsite-interpreter', component: OnsiteInterpreterComponent },
  { path: 'organizations', component: OrganizationPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutesModule {}
