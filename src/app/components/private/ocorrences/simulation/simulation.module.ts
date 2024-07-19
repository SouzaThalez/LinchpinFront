import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManitanceComponent } from './manitance/manitance.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { ManitanceSimulatorCardsComponent } from './manitance/manitance-simulator-cards/manitance-simulator-cards.component';

@NgModule({
  declarations: [
    ManitanceComponent,
    ScenarioComponent,
    ManitanceSimulatorCardsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SimulationModule { }
