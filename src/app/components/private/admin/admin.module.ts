import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminMenuModule } from '../../shared/admin-menu/admin-menu.module';
import { NewSimulatorComponent } from './new-simulator/new-simulator.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NewSimulatorDialogComponent } from './new-simulator/new-simulator-dialog/new-simulator-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteCodeDialogComponent } from './new-simulator/delete-code-dialog/delete-code-dialog.component';
import { EditCodeDialogComponent } from './new-simulator/edit-code-dialog/edit-code-dialog.component';
import { DetailSimulatorDialogComponent } from './new-simulator/detail-simulator-dialog/detail-simulator-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    NewSimulatorComponent,
    NewSimulatorDialogComponent,
    DeleteCodeDialogComponent,
    EditCodeDialogComponent,
    DetailSimulatorDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,

  ]
})
export class AdminModule { }
