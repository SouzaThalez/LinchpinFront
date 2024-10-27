import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserRoutingModule } from './new-user-routing.module';
import { NewUserComponent } from './new-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { NewTechnicianComponent } from './new-technician/new-technician.component';
import { NewAnalystComponent } from './new-analyst/new-analyst.component';
import { AddNewUserDialogComponent } from './add-new-user-dialog/add-new-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { RemoveUserDialogComponent } from './remove-user-dialog/remove-user-dialog.component';



@NgModule({
  declarations: [
    NewUserComponent,
    NewAdminComponent,
    NewTechnicianComponent,
    NewAnalystComponent,
    AddNewUserDialogComponent,
    EditUserDialogComponent,
    RemoveUserDialogComponent
  ],
  imports: [
    CommonModule,
    NewUserRoutingModule,
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
export class NewUserModule { }
