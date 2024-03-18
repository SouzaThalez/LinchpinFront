import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrl: './scenario.component.scss'
})
export class ScenarioComponent implements OnInit{
  
  scenarios = ocorranceData.scenarioTypes;
  constructor(){}
  ngOnInit(): void {
    
  }
}
