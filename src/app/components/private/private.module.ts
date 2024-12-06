import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { HomeComponent } from './home/home.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { PrivateRoutingModule } from './private-routing.module';
import { LogOutDialogComponent } from './left-panel/log-out-dialog/log-out-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
    LeftPanelComponent,
    RightPanelComponent,
    LogOutDialogComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class PrivateModule { }
