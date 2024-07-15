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
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HighCleaningDialogComponent } from './high-fidelity/high-cleaning-dialog/high-cleaning-dialog.component';


@NgModule({
  declarations: [
    CleaningComponent,
    LowFidelityComponent,
    MediumFidelityComponent,
    HighFidelityComponent,
    LowFidelityDetailsComponent,
    MediumCleaningDialogComponent,
    HighCleaningDialogComponent,
  ],
  imports: [
    CommonModule,
    CleaningRoutingModule,
    NavMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule

  ]
})
export class CleaningModule { }
