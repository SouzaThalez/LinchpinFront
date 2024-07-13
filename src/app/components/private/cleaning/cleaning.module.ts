import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleaningComponent } from './cleaning.component';
import { CleaningRoutingModule } from './cleaning-routing.module';
import { NavMenuModule } from '../../shared/nav-menu/nav-menu.module';
import { LowFidelityComponent } from './low-fidelity/low-fidelity.component';
import { MediumFidelityComponent } from './medium-fidelity/medium-fidelity.component';
import { HighFidelityComponent } from './high-fidelity/high-fidelity.component';
import { LowFidelityDetailsComponent } from './low-fidelity/low-fidelity-details/low-fidelity-details.component';
import { MediumCleaningDialogComponent } from './medium-fidelity/medium-cleaning-dialog/medium-cleaning-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    CleaningComponent,
    LowFidelityComponent,
    MediumFidelityComponent,
    HighFidelityComponent,
    LowFidelityDetailsComponent,
    MediumCleaningDialogComponent,
  ],
  imports: [
    CommonModule,
    CleaningRoutingModule,
    NavMenuModule,
    MatDialogModule

  ]
})
export class CleaningModule { }
