import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashComponent } from './dash/dash.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LogComponent } from './log/log.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TestChartComponent } from './test-chart/test-chart.component';
import { FormsModule } from '@angular/forms';
// import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [DashComponent, LogComponent, TestChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    SharedModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    DatePipe,
  ]
})
export class DashboardModule { }
