import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyModuleRoutingModule } from './notify-module-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    NotifyModuleRoutingModule,
    NgxSpinnerModule
  ]
})
export class NotifyModuleModule { }
