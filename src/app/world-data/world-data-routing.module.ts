import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldDataComponent } from './world-data/world-data.component';


const routes: Routes = [{
  path: '',
  component: WorldDataComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldDataRoutingModule { }
