import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldDataRoutingModule } from './world-data-routing.module';
import { WorldDataComponent } from './world-data/world-data.component';
import { SharedModule } from '../shared/shared.module';
import { NoCommaPipe } from '../shared/pipes/no-comma.pipe';


@NgModule({
  declarations: [WorldDataComponent],
  imports: [
    CommonModule,
    WorldDataRoutingModule,
    SharedModule
  ],
  providers: [
    NoCommaPipe
  ]
   
})
export class WorldDataModule { }
