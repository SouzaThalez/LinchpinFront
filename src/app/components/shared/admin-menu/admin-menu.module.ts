import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu.component';
import { AdminMenuRoutingModule } from './admin-menu-routing.module';



@NgModule({
  declarations: [
    AdminMenuComponent
  ],
  imports: [
    CommonModule,
    AdminMenuRoutingModule
  ],
  exports:[
    AdminMenuComponent
  ]
})
export class AdminMenuModule { }
