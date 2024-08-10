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
import { LowFidelityCleaningDialogComponent } from './low-fidelity/low-fidelity-cleaning-dialog/low-fidelity-cleaning-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SharedModule } from '../../shared/shared.module';
import {HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    CleaningComponent,
    LowFidelityComponent,
    MediumFidelityComponent,
    HighFidelityComponent,
    LowFidelityDetailsComponent,
    MediumCleaningDialogComponent,
    HighCleaningDialogComponent,
    LowFidelityCleaningDialogComponent,
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
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule
    

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' } // Set the date locale to Portuguese (Brazil)
  ],
})
export class CleaningModule { }
