import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { NavMenuModule } from "../../shared/nav-menu/nav-menu.module";
import { HabilityComponent } from './hability/hability.component';
import { SimulationComponent } from './simulation/simulation.component';
import { TabMenuModule } from "../../shared/tab-menu/tab-menu.module";

@NgModule({
    declarations: [
        ReportsComponent,
        HabilityComponent,
        SimulationComponent
    ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        NavMenuModule,
        TabMenuModule
    ]
})
export class ReportsModule { }
