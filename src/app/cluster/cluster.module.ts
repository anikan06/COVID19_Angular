import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClusterRoutingModule } from './cluster-routing.module';
import { ClusterComponentComponent } from './cluster-component/cluster-component.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TitleCasePipe } from '@angular/common';


@NgModule({
  declarations: [ClusterComponentComponent],
  imports: [
    CommonModule,
    ClusterRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    TitleCasePipe
  ]
})
export class ClusterModule { }
