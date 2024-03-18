import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManitanceComponent } from './manitance/manitance.component';
import { ScenarioComponent } from './scenario/scenario.component';

@NgModule({
  declarations: [
    ManitanceComponent,
    ScenarioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SimulationModule { }
