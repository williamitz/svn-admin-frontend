import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotifyWidgetComponent } from './list-notify-widget/list-notify-widget.component';
import { NgbDropdownModule, NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChartBarWidgetComponent } from './chart-bar-widget/chart-bar-widget.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartPieWidgetComponent } from './chart-pie-widget/chart-pie-widget.component';
import { ChartBarCountriesWidgetComponent } from './chart-bar-countries-widget/chart-bar-countries-widget.component';
import { SoftphoneComponent } from './softphone/softphone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFilterLiteComponent } from './date-filter-lite/date-filter-lite.component';
import { AdditionalSessionInformationComponent } from './additional-session-information/additional-session-information.component';
import { EarningsViewComponent } from './earnings-view/earnings-view.component';
import { OnDemandServicesComponent } from './on-demand-services/on-demand-services.component';


@NgModule({
  declarations: [
    ListNotifyWidgetComponent,
    ChartBarWidgetComponent,
    ChartPieWidgetComponent,
    ChartBarCountriesWidgetComponent,
    SoftphoneComponent,
    DateFilterLiteComponent,
    AdditionalSessionInformationComponent,
    EarningsViewComponent,
    OnDemandServicesComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbRatingModule,
  ],
  exports: [
    ListNotifyWidgetComponent,
    ChartBarWidgetComponent,
    ChartPieWidgetComponent,
    ChartBarCountriesWidgetComponent,
    SoftphoneComponent,
    DateFilterLiteComponent,
    AdditionalSessionInformationComponent,
    EarningsViewComponent,
    OnDemandServicesComponent,
  ]
})
export class WidgetsModule { }
