import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertsRoutingModule } from './concerts-routing.module';
import { NavMenuModule } from '../../shared/nav-menu/nav-menu.module';
import { ConcertsComponent } from './concerts.component';
import { LowHabilityComponent } from './low-hability/low-hability.component';
import { MediumHabilityComponent } from './medium-hability/medium-hability.component';
import { HighHabilityComponent } from './high-hability/high-hability.component';
import { LowHabilityDetailsComponent } from './low-hability/low-hability-details/low-hability-details.component';



@NgModule({
  declarations: [
    ConcertsComponent,
    LowHabilityComponent,
    MediumHabilityComponent,
    HighHabilityComponent,
    LowHabilityDetailsComponent,
  ],
  imports: [
    CommonModule,
    ConcertsRoutingModule,
    NavMenuModule
  ]
})
export class ConcertsModule { }
