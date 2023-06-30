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

@NgModule({
  // TODO: importar vistas
  declarations: [
    AdminLayoutComponent,
    HomePageComponent,
    ClientPageComponent,
    OrganizationPageComponent,
    ScheduleInterpreterComponent,
    NewassignmentInterpreterComponent,
    OnsiteInterpreterComponent
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

     NgSelectModule
  ]
})
export class AdminLayoutModule { }
