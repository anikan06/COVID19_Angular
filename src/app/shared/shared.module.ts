import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoCommaPipe } from './pipes/no-comma.pipe';



@NgModule({
  declarations: [NoCommaPipe],
  imports: [
    CommonModule
  ],
  exports: [NoCommaPipe]
})
export class SharedModule { }
