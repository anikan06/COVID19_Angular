import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EssentialModRoutingModule } from './essential-mod-routing.module';
import { ServicesAvailablityComponent } from './services-availablity/services-availablity.component';
import { AngularWebStorageModule } from 'angular-web-storage';


@NgModule({
  declarations: [ServicesAvailablityComponent],
  imports: [
    CommonModule,
    EssentialModRoutingModule,
    FormsModule,
    AngularWebStorageModule
  ]
})
export class EssentialModModule { }
