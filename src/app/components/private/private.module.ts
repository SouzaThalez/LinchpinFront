import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { HomeComponent } from './home/home.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { PrivateRoutingModule } from './private-routing.module';
import { LogOutDialogComponent } from './left-panel/log-out-dialog/log-out-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
    LeftPanelComponent,
    RightPanelComponent,
    LogOutDialogComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatDialogModule
  ]
})
export class PrivateModule { }
