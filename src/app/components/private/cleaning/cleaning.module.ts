import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleaningComponent } from './cleaning.component';
import { CleaningRoutingModule } from './cleaning-routing.module';
import { NavMenuComponent } from '../../shared/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    CleaningComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    CleaningRoutingModule
  ]
})
export class CleaningModule { }
