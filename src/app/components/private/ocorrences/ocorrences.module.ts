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
import { TrainingLessonCardsComponent } from './low-ocorrance/trainings/training-lesson-cards/training-lesson-cards.component';
import { DisciplineLessonCardsComponent } from './low-ocorrance/disciplines/discipline-lesson-cards/discipline-lesson-cards.component';
import { OcorranceDialogComponent } from './low-ocorrance/ocorrance-dialog/ocorrance-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManitanceSimulatorCardsComponent } from './simulation/manitance/manitance-simulator-cards/manitance-simulator-cards.component';
import { ScenarioRegisterCardsComponent } from './simulation/scenario/scenario-register-cards/scenario-register-cards.component';
import { RegisterManitanceDialogComponent } from './simulation/manitance/register-manitance-dialog/register-manitance-dialog.component';
import { RegisterScenarioDialogComponent } from './simulation/scenario/register-scenario-dialog/register-scenario-dialog.component';
import { RegisterPreScenarioDialogComponent } from './simulation/scenario/register-pre-scenario-dialog/register-pre-scenario-dialog.component';




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
    CoursersAhaComponent,
    TrainingLessonCardsComponent,
    DisciplineLessonCardsComponent,
    OcorranceDialogComponent,
    ManitanceSimulatorCardsComponent,
    ScenarioRegisterCardsComponent,
    RegisterManitanceDialogComponent,
    RegisterScenarioDialogComponent,
    RegisterPreScenarioDialogComponent
  ],
  imports: [
    CommonModule,
    OcorrencesRoutingModule,
    NavMenuModule,
    TabMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
   
  ]
})
export class OcorrencesModule { }
