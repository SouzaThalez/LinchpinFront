import { Component, OnInit } from '@angular/core';
import { simulatorTypes } from '../../../../data/simulatorTypes';

@Component({
  selector: 'app-low-fidelity',
  templateUrl: './low-fidelity.component.html',
  styleUrl: './low-fidelity.component.scss'
})
export class LowFidelityComponent implements OnInit{

  simTypes = simulatorTypes;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
