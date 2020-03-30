import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashComponent } from './dash/dash.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [DashComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule
  ]
})
export class DashboardModule { }
