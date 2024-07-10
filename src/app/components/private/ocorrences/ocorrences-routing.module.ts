import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcorrencesComponent } from './ocorrences.component';
import { LowOcorranceComponent } from './low-ocorrance/low-ocorrance.component';
import { TrainingsComponent } from './low-ocorrance/trainings/trainings.component';
import { DisciplinesComponent } from './low-ocorrance/disciplines/disciplines.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ManitanceComponent } from './simulation/manitance/manitance.component';
import { ScenarioComponent } from './simulation/scenario/scenario.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursersAhaComponent } from './courses/coursers-aha/coursers-aha.component';
import { TrainingLessonCardsComponent } from './low-ocorrance/trainings/training-lesson-cards/training-lesson-cards.component';

const routes: Routes = [
  { 
    path: '', 
    component: OcorrencesComponent,
    children:[
      {
        path:'Habilidade',
        component:LowOcorranceComponent,
        children:[
          {
            path:'treinamentos',
            component:TrainingsComponent
          },
          {
            path:'treinamentos/:index',
            component:TrainingLessonCardsComponent
          },
          {
            path:'disciplinas',
            component:DisciplinesComponent
          },
          {
            path:'disciplinas/:index',
            component:DisciplinesComponent
          },
          {
            path:'**',
            redirectTo:'treinamentos'
          },
        ]
      },
      {
        path:'Simulação',
        component:SimulationComponent,
        children:[
          {
            path:'registros-manutenções',
            component:ManitanceComponent
          },
          {
            path:'registros-manutenções/:index',
            component:ManitanceComponent
          },
          {
            path:'registros-cenários',
            component:ScenarioComponent
          },
          {
            path:'**',
            redirectTo:'registros-manutenções'
          },
        ]
      },
      {
        path:'Cursos',
        component:CoursesComponent,
        children:[
          {
            path:'Cursos-AHA',
            component:CoursersAhaComponent
          },
          {
            path:'**',
            redirectTo:'Cursos-AHA'
          },
        ]
      },
      {
        path:'**',
        redirectTo:'Habilidade'
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcorrencesRoutingModule { }
