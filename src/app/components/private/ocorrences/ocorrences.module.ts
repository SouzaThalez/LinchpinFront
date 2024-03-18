import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcorrencesComponent } from './ocorrences.component';
import { OcorrencesRoutingModule } from './ocorrences-routing.module';
import { NavMenuModule } from '../../shared/nav-menu/nav-menu.module';
import { TabMenuModule } from '../../shared/tab-menu/tab-menu.module';
import { LowOcorranceComponent } from './low-ocorrance/low-ocorrance.component';
import { TrainingsComponent } from './low-ocorrance/trainings/trainings.component';
import { DisciplinesComponent } from './low-ocorrance/disciplines/disciplines.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ManitanceComponent } from './simulation/manitance/manitance.component';
import { ScenarioComponent } from './simulation/scenario/scenario.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursersAhaComponent } from './courses/coursers-aha/coursers-aha.component';

@NgModule({
  declarations: [
    OcorrencesComponent,
    LowOcorranceComponent,
    TrainingsComponent,
    DisciplinesComponent,
    SimulationComponent,
    ManitanceComponent,
    ScenarioComponent,
    CoursesComponent,
    CoursersAhaComponent
  ],
  imports: [
    CommonModule,
    OcorrencesRoutingModule,
    NavMenuModule,
    TabMenuModule
    
  ]
})
export class OcorrencesModule { }
