import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { HabilityReportComponent } from './hability-report/hability-report.component';
import { LessonReportComponent } from './hability-report/lesson-report/lesson-report.component';
import { CleaningReportComponent } from './hability-report/cleaning-report/cleaning-report.component';
import { MaintenanceReportComponent } from './hability-report/maintenance-report/maintenance-report.component';
import { SimulationComponent } from './simulation/simulation.component';
import { MaintenanceSimulationReportComponent } from './simulation/maintenance-simulation-report/maintenance-simulation-report.component';
import { CleaningSimulationReportComponent } from './simulation/cleaning-simulation-report/cleaning-simulation-report.component';
import { ScenarioSimulationReportComponent } from './simulation/scenario-simulation-report/scenario-simulation-report.component';



const routes: Routes = [
    { 
        path: '', 
        component: ReportsComponent,
        children:[
          {
            path:'Habilidade',
            component:HabilityReportComponent,
            children:[
              {
                path:'relatorio-aula',
                component:LessonReportComponent
              },
              {
                path:'relatorio-limpeza',
                component:CleaningReportComponent
              },
              {
                path:'relatorio-manutencao',
                component:MaintenanceReportComponent
              },
              {
                path:'**',
                redirectTo:'relatorio-aula'
              },
            ]
          },
          {
            path:'Simulação',
            component:SimulationComponent,
            children:[
              {
                path:'relatorio-cenarios',
                component: ScenarioSimulationReportComponent
              },
              {
                path:'relatorio-limpeza',
                component:CleaningSimulationReportComponent
              },
              {
                path:'relatorio-manutencao',
                component:MaintenanceSimulationReportComponent
              },
              {
                path:'**',
                redirectTo:'relatorio-cenarios'
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
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
