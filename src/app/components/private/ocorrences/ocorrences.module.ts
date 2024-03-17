import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcorrencesComponent } from './ocorrences.component';
import { OcorrencesRoutingModule } from './ocorrences-routing.module';
import { NavMenuModule } from '../../shared/nav-menu/nav-menu.module';
import { TabMenuModule } from '../../shared/tab-menu/tab-menu.module';

@NgModule({
  declarations: [
    OcorrencesComponent,
  ],
  imports: [
    CommonModule,
    OcorrencesRoutingModule,
    NavMenuModule,
    TabMenuModule
    
  ]
})
export class OcorrencesModule { }
