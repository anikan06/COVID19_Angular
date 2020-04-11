import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesAvailablityComponent } from './services-availablity/services-availablity.component';


const routes: Routes = [{
  path: '',
  component: ServicesAvailablityComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EssentialModRoutingModule { }
