import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponentComponent } from './nav-component/nav-component.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: NavComponentComponent,
    children: [
      {
        path: 'Dashboard',
        loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'Clusters',
        loadChildren: 'src/app/cluster/cluster.module#ClusterModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopHeadRoutingModule { }
