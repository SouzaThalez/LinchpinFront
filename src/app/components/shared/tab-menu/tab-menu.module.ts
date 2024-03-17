import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuComponent } from './tab-menu.component';
import { TabMenuRoutingModule } from './tab-menu-routing.module';

@NgModule({
  declarations: [
    TabMenuComponent
  ],
  imports: [
    CommonModule,
    TabMenuRoutingModule
  ],
  exports:[
    TabMenuComponent
  ]
})
export class TabMenuModule { }
