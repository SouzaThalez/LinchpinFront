import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../data/simulators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-simulator',
  templateUrl: './new-simulator.component.html',
  styleUrl: './new-simulator.component.scss'
})
export class NewSimulatorComponent implements OnInit{

  midiumSimulators = simulators.mediumFidelity;
  highSimulators = simulators.highFidelity;
  
  value:any;
  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
  ){}
  
  ngOnInit(): void {
    
  }

  getSimulatorData(element: number){
    this.value = element;
    // switch (element) {
    //   case 1:
    //     this.lowSimulatorsData = simulators.highFidelity;
    //     break;
    //     case 1:
    //     this.lowSimulatorsData = simulators.mediumFidelity;
    //       break;
    
    //   default:
    //     break;
    // }
  }

}
