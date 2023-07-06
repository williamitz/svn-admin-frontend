import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';
import { ScheduleInterpreterComponent } from './schedule-interpreter/schedule-interpreter.component';
import { NewassignmentInterpreterComponent } from './newassignment-interpreter/newassignment-interpreter.component';
import { OnsiteInterpreterComponent } from './onsite-interpreter/onsite-interpreter.component';
import { PoolAddInterpreterComponent } from './pool-add-interpreter/pool-add-interpreter.component';
import { PoolActivityInterpreterComponent } from './pool-activity-interpreter/pool-activity-interpreter.component';
import { ProfileInterpreterComponent } from './profile-interpreter/profile-interpreter.component';
import { InterpreterPageComponent } from './interpreter-page/interpreter-page.component';

// TODO: crear rutas
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'clients', component: ClientPageComponent },
  { path: 'interpreters', component: InterpreterPageComponent },
  { path: 'shedule', component: ScheduleInterpreterComponent },
  { path: 'new-assignment-interpreter', component: NewassignmentInterpreterComponent },
  { path: 'onsite-interpreter', component: OnsiteInterpreterComponent },
  { path: 'pool-interpreter', component: PoolAddInterpreterComponent },
  { path: 'pool-activity-interpreter', component: PoolActivityInterpreterComponent },
  { path: 'profile-interpreter', component: ProfileInterpreterComponent },
  { path: 'organizations', component: OrganizationPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutesModule {}
