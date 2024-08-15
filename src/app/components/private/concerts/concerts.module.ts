import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertsRoutingModule } from './concerts-routing.module';
import { NavMenuModule } from '../../shared/nav-menu/nav-menu.module';
import { ConcertsComponent } from './concerts.component';
import { LowHabilityComponent } from './low-hability/low-hability.component';
import { MediumHabilityComponent } from './medium-hability/medium-hability.component';
import { HighHabilityComponent } from './high-hability/high-hability.component';
import { TabMenuModule } from '../../shared/tab-menu/tab-menu.module';
import { CleaningRegistersComponent } from './low-hability/cleaning-registers/cleaning-registers.component';
import { OcorranceRegistersComponent } from './low-hability/ocorrance-registers/ocorrance-registers.component';
import { MediumCleaningRegisterComponent } from './medium-hability/medium-cleaning-register/medium-cleaning-register.component';
import { MediumOcorranceRegisterComponent } from './medium-hability/medium-ocorrance-register/medium-ocorrance-register.component';
import { HighCleaningRegisterComponent } from './high-hability/high-cleaning-register/high-cleaning-register.component';
import { HighManitenceRegisterComponent } from './high-hability/high-manitence-register/high-manitence-register.component';



@NgModule({
  declarations: [
    ConcertsComponent,
    LowHabilityComponent,
    MediumHabilityComponent,
    HighHabilityComponent,
    CleaningRegistersComponent,
    OcorranceRegistersComponent,
    MediumCleaningRegisterComponent,
    MediumOcorranceRegisterComponent,
    HighCleaningRegisterComponent,
    HighManitenceRegisterComponent,
  ],
  imports: [
    CommonModule,
    ConcertsRoutingModule,
    NavMenuModule,
    TabMenuModule
  ]
})
export class ConcertsModule { }
