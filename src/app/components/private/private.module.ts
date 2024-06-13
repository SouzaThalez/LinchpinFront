import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { HomeComponent } from './home/home.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
    LeftPanelComponent,
    RightPanelComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
