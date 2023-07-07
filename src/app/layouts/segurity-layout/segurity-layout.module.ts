import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedLayoutModule } from '../shared/shared-layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { SegurityLayoutComponent } from './segurity-layout.component';
import { SegurityLayoutRoutingModule } from './segurity-layout.routing.module';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

import { SwiperModule } from 'swiper/angular';
import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePageComponent } from './profile-page/profile-page.component';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Mask
// import { NgxMaskModule } from 'ngx-mask';
import { IConfig, NgxMaskDirective } from 'ngx-mask'

// Load Icon
import { defineElement } from 'lord-icon-element';
// import lottie from 'lottie-web';
import { RouterModule } from '@angular/router';
import { RoleFrmComponent } from './role-frm/role-frm.component';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MenuComponent } from './menu/menu.component';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    SegurityLayoutComponent,
    UserComponent,
    RoleComponent,
    RoleFrmComponent,
    ProfilePageComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ReactiveFormsModule,
    SwiperModule,
    // TranslateModule,
    SegurityLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    NgSelectModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbPaginationModule,
    FeatherModule.pick(allIcons),
    NgxMaskDirective,

    RouterModule,

    PipesModule
  ],
  providers: [
    provideEnvironmentNgxMask( maskConfig ),
  ]
})
export class SegurityLayoutModule {

  constructor() {
    // defineElement(lottie.loadAnimation);
  }


}
