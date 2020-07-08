import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { TestChartComponent } from './test-chart/test-chart.component';


const routes: Routes = [
  {
    path: '',
    component: DashComponent
  },
  {
    path: 'testChart',
    component: TestChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
