import { Component, OnInit } from '@angular/core';
import { LowFidelityCleaningDialogComponent } from '../low-fidelity-cleaning-dialog/low-fidelity-cleaning-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-low-fidelity-details',
  templateUrl: './low-fidelity-details.component.html',
  styleUrl: './low-fidelity-details.component.scss'
})
export class LowFidelityDetailsComponent implements OnInit{



  constructor(
    private matDialog: MatDialog,
  ){}

  ngOnInit(): void {
   
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
