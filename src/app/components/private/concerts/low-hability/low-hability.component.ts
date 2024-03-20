import { Component, OnInit } from '@angular/core';
import { simulatorTypes } from '../../../../data/simulatorTypes';

@Component({
  selector: 'app-low-hability',
  templateUrl: './low-hability.component.html',
  styleUrl: './low-hability.component.scss'
})
export class LowHabilityComponent implements OnInit{


  simTypes = simulatorTypes;
  constructor(){}
  ngOnInit(): void {
   
  }

}
