import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteCodeDialogComponent } from '../delete-code-dialog/delete-code-dialog.component';

@Component({
  selector: 'app-new-simulator-dialog',
  templateUrl: './new-simulator-dialog.component.html',
  styleUrl: './new-simulator-dialog.component.scss'
})
export class NewSimulatorDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DeleteCodeDialogComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}

  ngOnInit(): void {
    console.log(this.data.simulatorData)
  }


  openDeleteCodeDialog(simulator: any){

    let dialogRef = this.matDialog.open(DeleteCodeDialogComponent,{
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
