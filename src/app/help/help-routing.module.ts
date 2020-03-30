import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeplfulLinksComponent } from './heplful-links/heplful-links.component';
import { FaqComponent } from './faq/faq.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'Helpfull-Links',
    pathMatch: 'full'
  },
  {
    path: 'Helpfull-Links',
    component: HeplfulLinksComponent
  },
  {
    path: 'FAQ',
    component: FaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
