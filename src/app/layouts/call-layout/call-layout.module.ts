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



@NgModule({
  declarations: [
    CallLayoutComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

    NgSelectModule,
    FeatherModule.pick(allIcons),
    NgxMaskDirective,

    CallLayoutRoutingModule
  ]
})
export class CallLayoutModule { }
