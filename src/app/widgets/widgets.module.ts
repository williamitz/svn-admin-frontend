import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotifyWidgetComponent } from './list-notify-widget/list-notify-widget.component';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChartBarWidgetComponent } from './chart-bar-widget/chart-bar-widget.component';


@NgModule({
  declarations: [
    ListNotifyWidgetComponent,
    ChartBarWidgetComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
  ],
  exports: [
    ListNotifyWidgetComponent,
    ChartBarWidgetComponent
  ]
})
export class WidgetsModule { }
