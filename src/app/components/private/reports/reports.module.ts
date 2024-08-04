import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { NavMenuModule } from "../../shared/nav-menu/nav-menu.module";
import { SimulationComponent } from './simulation/simulation.component';
import { TabMenuModule } from "../../shared/tab-menu/tab-menu.module";
import { HabilityReportComponent } from './hability-report/hability-report.component';
import { LessonReportComponent } from './hability-report/lesson-report/lesson-report.component';
import { MaintenanceSimulationReportComponent } from './simulation/maintenance-simulation-report/maintenance-simulation-report.component';
import { CleaningSimulationReportComponent } from './simulation/cleaning-simulation-report/cleaning-simulation-report.component';
import { ScenarioSimulationReportComponent } from './simulation/scenario-simulation-report/scenario-simulation-report.component';
import { CleaningReportComponent } from './hability-report/cleaning-report/cleaning-report.component';
import { MaintenanceReportComponent } from './hability-report/maintenance-report/maintenance-report.component';

@NgModule({
    declarations: [
        ReportsComponent,
        SimulationComponent,
        HabilityReportComponent,
        LessonReportComponent,
        CleaningReportComponent,
        MaintenanceReportComponent,
        MaintenanceSimulationReportComponent,
        CleaningSimulationReportComponent,
        ScenarioSimulationReportComponent
    ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        NavMenuModule,
        TabMenuModule
    ]
})
export class ReportsModule { }
