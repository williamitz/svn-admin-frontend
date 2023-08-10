import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotifyWidgetComponent } from './list-notify-widget/list-notify-widget.component';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChartBarWidgetComponent } from './chart-bar-widget/chart-bar-widget.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartPieWidgetComponent } from './chart-pie-widget/chart-pie-widget.component';
import { ChartBarCountriesWidgetComponent } from './chart-bar-countries-widget/chart-bar-countries-widget.component';
import { SoftphoneComponent } from './softphone/softphone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListNotifyWidgetComponent,
    ChartBarWidgetComponent,
    ChartPieWidgetComponent,
    ChartBarCountriesWidgetComponent,
    SoftphoneComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ListNotifyWidgetComponent,
    ChartBarWidgetComponent,
    ChartPieWidgetComponent,
    ChartBarCountriesWidgetComponent,
    SoftphoneComponent
  ]
})
export class WidgetsModule { }
