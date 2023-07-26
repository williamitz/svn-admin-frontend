import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotifyWidgetComponent } from './list-notify-widget/list-notify-widget.component';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChartBarWidgetComponent } from './chart-bar-widget/chart-bar-widget.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartPieWidgetComponent } from './chart-pie-widget/chart-pie-widget.component';
import { ChartBarCountriesWidgetComponent } from './chart-bar-countries-widget/chart-bar-countries-widget.component';


@NgModule({
  declarations: [
    ListNotifyWidgetComponent,
    ChartBarWidgetComponent,
    ChartPieWidgetComponent,
    ChartBarCountriesWidgetComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule
  ],
  exports: [
    ListNotifyWidgetComponent,
    ChartBarWidgetComponent,
    ChartPieWidgetComponent,
    ChartBarCountriesWidgetComponent
  ]
})
export class WidgetsModule { }
