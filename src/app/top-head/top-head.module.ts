import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopHeadRoutingModule } from './top-head-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavComponentComponent } from './nav-component/nav-component.component';


@NgModule({
  declarations: [NavbarComponent, NavComponentComponent],
  imports: [
    CommonModule,
    TopHeadRoutingModule,
    NgbModule
  ]
})
export class TopHeadModule { }
