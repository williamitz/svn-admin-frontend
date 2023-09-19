import { NgModule } from '@angular/core';
import { AccessLayoutComponent } from './access-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedLayoutModule } from '../shared/shared-layout.module';
import { SwiperModule } from 'swiper/angular';
import { NgbPaginationModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { PortalInterprterComponent } from './portal-interprter/portal-interprter.component';
import { MyassignmetInterpreterComponent } from './myassignmet-interpreter/myassignmet-interpreter.component';
import { AccessLayoutRoutingModule } from './access-layout.routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FlatpickrModule } from 'angularx-flatpickr';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { TabOnDemandServicesComponent } from './portal-interprter/tab-on-demand-services/tab-on-demand-services.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccessLayoutComponent,
    PortalInterprterComponent,
    MyassignmetInterpreterComponent,
    TabOnDemandServicesComponent,
    // ProfileInterpreterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedLayoutModule,
    SwiperModule,
    NgbPaginationModule,
    AccessLayoutRoutingModule,
    FullCalendarModule,
    FlatpickrModule.forRoot(),
    TranslateModule,
    NgbRatingModule,
    WidgetsModule,
  ],
  exports: [],
  providers: [],
})
export class AccessLayoutModule { }
