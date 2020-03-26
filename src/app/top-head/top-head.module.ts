import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopHeadRoutingModule } from './top-head-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavComponentComponent } from './nav-component/nav-component.component';


@NgModule({
  declarations: [NavbarComponent, NavComponentComponent],
  imports: [
    CommonModule,
    TopHeadRoutingModule
  ]
})
export class TopHeadModule { }
