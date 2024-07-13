import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../data/simulators';

@Component({
  selector: 'app-high-fidelity',
  templateUrl: './high-fidelity.component.html',
  styleUrl: './high-fidelity.component.scss'
})
export class HighFidelityComponent implements OnInit{

  highSimulators = simulators.highFidelity;
  constructor(){}
  ngOnInit(): void {
    
  }

}
