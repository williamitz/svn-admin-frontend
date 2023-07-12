import { Component, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-chart-pie-widget',
  templateUrl: './chart-pie-widget.component.html',
  styleUrls: ['./chart-pie-widget.component.scss']
})
export class ChartPieWidgetComponent {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: "donut",
      width: 490
    },
    labels: ["Cantones", "Mandarin Chinese", "Spanish", "Japanese", "Russian"],
    
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 340
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

}
