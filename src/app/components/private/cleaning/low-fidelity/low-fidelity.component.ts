import { Component, OnInit } from '@angular/core';
import { simulatorTypes } from '../../../../data/simulatorTypes';
import { simulators } from '../../../../data/simulators';

@Component({
  selector: 'app-low-fidelity',
  templateUrl: './low-fidelity.component.html',
  styleUrl: './low-fidelity.component.scss'
})
export class LowFidelityComponent implements OnInit{

  simTypes = simulatorTypes;
  simulatorClasses = simulators.lowFidelity

  ngOnInit(): void {
    
  }

}
