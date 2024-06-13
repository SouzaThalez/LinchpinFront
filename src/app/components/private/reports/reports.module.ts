import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { NavMenuModule } from "../../shared/nav-menu/nav-menu.module";

@NgModule({
    declarations: [
        ReportsComponent
    ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        NavMenuModule
    ]
})
export class ReportsModule { }
