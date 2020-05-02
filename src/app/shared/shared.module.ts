import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { NoCommaPipe } from './pipes/no-comma.pipe';
import { StateSearchComponent } from './components/state-search/state-search.component';



@NgModule({
  declarations: [NoCommaPipe, StateSearchComponent],
  imports: [
    CommonModule
  ],
  providers: [
    TitleCasePipe
  ],
  exports: [NoCommaPipe, StateSearchComponent]
})
export class SharedModule { }
