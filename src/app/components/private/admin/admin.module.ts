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



@NgModule({
  declarations: [
    AdminComponent,
    NewSimulatorComponent
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
    MatCardModule
  ]
})
export class AdminModule { }
