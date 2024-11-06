import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
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
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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
        TabMenuModule,
        HttpClientModule,
        MatDatepickerModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
 
})
export class ReportsModule { }
