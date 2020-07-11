import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { NoCommaPipe } from './pipes/no-comma.pipe';
import { StateSearchComponent } from './components/state-search/state-search.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [NoCommaPipe, StateSearchComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  providers: [
    TitleCasePipe
  ],
  exports: [NoCommaPipe, StateSearchComponent]
})
export class SharedModule { }
