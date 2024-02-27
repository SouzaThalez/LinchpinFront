import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcorrencesComponent } from './ocorrences.component';
import { OcorrencesRoutingModule } from './ocorrences-routing.module';
import { TabMenuComponent } from '../../shared/tab-menu/tab-menu.component';
import { NavMenuComponent } from '../../shared/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    OcorrencesComponent,
    TabMenuComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    OcorrencesRoutingModule
  ]
})
export class OcorrencesModule { }
