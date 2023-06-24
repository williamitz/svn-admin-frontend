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

@NgModule({
  // TODO: importar vistas
  declarations: [
    AdminLayoutComponent,
    HomePageComponent,
    ClientPageComponent,
    OrganizationPageComponent
  ],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ReactiveFormsModule,
    FeatherModule.pick(allIcons),
    AdminLayoutRoutingModule,
    WidgetsModule,
    RouterModule,

     NgSelectModule
  ]
})
export class AdminLayoutModule { }
