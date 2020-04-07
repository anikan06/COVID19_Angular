import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashComponent } from './dash/dash.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LogComponent } from './log/log.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [DashComponent, LogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule { }
