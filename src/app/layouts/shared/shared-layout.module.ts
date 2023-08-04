import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,

    FormsModule,
    ReactiveFormsModule,

    TranslateModule,
    RouterModule,
    WidgetsModule
  ],
  exports: [
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    PaginationComponent
  ]
})
export class SharedLayoutModule { }
