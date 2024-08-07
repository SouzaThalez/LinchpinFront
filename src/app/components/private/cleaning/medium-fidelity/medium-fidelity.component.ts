import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../data/simulators';
import { MatDialog } from '@angular/material/dialog';
import { MediumCleaningDialogComponent } from './medium-cleaning-dialog/medium-cleaning-dialog.component';

@Component({
  selector: 'app-medium-fidelity',
  templateUrl: './medium-fidelity.component.html',
  styleUrl: './medium-fidelity.component.scss'
})
export class MediumFidelityComponent implements OnInit{

  mediumSimulators = simulators.mediumFidelity;

  constructor(
    private matDialog: MatDialog,
  ){}

  ngOnInit(): void {
    
  }

  openMediumCleaningDialog(element: any){

    let dialogRef = this.matDialog.open(MediumCleaningDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        simulator: element
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }



}
