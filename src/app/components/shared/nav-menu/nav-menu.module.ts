import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import { NavMenuRoutingModule } from './nav-menu-routing.module';

@NgModule({
  declarations: [
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    NavMenuRoutingModule
  ],
  exports:[
    NavMenuComponent
  ]
})
export class NavMenuModule { }
