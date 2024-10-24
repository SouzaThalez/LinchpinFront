import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSimulatorRoutingModule } from './new-simulator-routing.module';
import { NewSimulatorComponent } from './new-simulator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MediumFidelitySimulatorsComponent } from './medium-fidelity-simulators/medium-fidelity-simulators.component';
import { HighFidelitySimulatorsComponent } from './high-fidelity-simulators/high-fidelity-simulators.component';



@NgModule({
  declarations: [
    NewSimulatorComponent,
    MediumFidelitySimulatorsComponent,
    HighFidelitySimulatorsComponent
  ],
  imports: [
    CommonModule,
    NewSimulatorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule
  ]
})
export class NewSimulatorModule { }
