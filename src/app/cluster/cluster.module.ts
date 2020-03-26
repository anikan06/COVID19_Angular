import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClusterRoutingModule } from './cluster-routing.module';
import { ClusterComponentComponent } from './cluster-component/cluster-component.component';


@NgModule({
  declarations: [ClusterComponentComponent],
  imports: [
    CommonModule,
    ClusterRoutingModule
  ]
})
export class ClusterModule { }
