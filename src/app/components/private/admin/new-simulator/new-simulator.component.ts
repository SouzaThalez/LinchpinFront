import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../data/simulators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NewSimulatorDialogComponent } from './new-simulator-dialog/new-simulator-dialog.component';

@Component({
  selector: 'app-new-simulator',
  templateUrl: './new-simulator.component.html',
  styleUrl: './new-simulator.component.scss'
})
export class NewSimulatorComponent implements OnInit{

  midiumSimulators = simulators.mediumFidelity;
  highSimulators = simulators.highFidelity;
  lowCategories = simulators.lowFidelity;
  
  value:any;
  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
  ){}
  
  ngOnInit(): void {
    console.log(this.lowCategories)
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

  openNewSimulatorDialog(simulator:any){
      
    let dialogRef = this.matDialog.open(NewSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{simulatorData:simulator}
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

}
