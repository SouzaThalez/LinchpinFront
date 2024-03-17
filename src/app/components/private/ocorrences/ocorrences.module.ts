import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcorrencesComponent } from './ocorrences.component';
import { OcorrencesRoutingModule } from './ocorrences-routing.module';
import { NavMenuModule } from '../../shared/nav-menu/nav-menu.module';
import { TabMenuModule } from '../../shared/tab-menu/tab-menu.module';
import { LowOcorranceComponent } from './low-ocorrance/low-ocorrance.component';
import { MediumOcorranceComponent } from './medium-ocorrance/medium-ocorrance.component';
import { HighOcorranceComponent } from './high-ocorrance/high-ocorrance.component';

@NgModule({
  declarations: [
    OcorrencesComponent,
    LowOcorranceComponent,
    MediumOcorranceComponent,
    HighOcorranceComponent,
  ],
  imports: [
    CommonModule,
    OcorrencesRoutingModule,
    NavMenuModule,
    TabMenuModule
    
  ]
})
export class OcorrencesModule { }
