import { Component, OnInit } from '@angular/core';
import { LowFidelityCleaningDialogComponent } from '../low-fidelity-cleaning-dialog/low-fidelity-cleaning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { simulators } from '../../../../../data/simulators';

@Component({
  selector: 'app-low-fidelity-details',
  templateUrl: './low-fidelity-details.component.html',
  styleUrl: './low-fidelity-details.component.scss'
})
export class LowFidelityDetailsComponent implements OnInit{

  routeIndex: string;
  routeName:string;
  lowSimulatorsData = simulators.lowFidelity;
  lowSimulators: Array<any> = [];
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    
    this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      this.lowSimulators = this.lowSimulatorsData[this.routeIndex].simulators;
      this.routeName = this.lowSimulatorsData[this.routeIndex].simulatorClass;
      this.isLoading = true;
      console.log(this.lowSimulators)
   })

  }


  openLowCleaningDialog(){

    let dialogRef = this.matDialog.open(LowFidelityCleaningDialogComponent,{
      disableClose: true,
      width:'650px'
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }


}
