import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemoveSimulatorDialogComponent } from './remove-simulator-dialog/remove-simulator-dialog.component';

@Component({
  selector: 'app-detail-class-simulator-dialog',
  templateUrl: './detail-class-simulator-dialog.component.html',
  styleUrl: './detail-class-simulator-dialog.component.scss'
})
export class DetailClassSimulatorDialogComponent implements OnInit{
  
  constructor(
    public dialogRef: MatDialogRef<DetailClassSimulatorDialogComponent>,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}

  ngOnInit(): void {
    console.log(this.data.simulatorData)
  }

  closeDialog(value: any){
    this.dialogRef.close(value);
  }

  openRemoveSimulatorDialog(simulator:any){
    
  let dialogRef = this.matDialog.open(RemoveSimulatorDialogComponent,{
    disableClose: true,
    width:'650px',
    height:'510px',
    data:{
      simulatorData:simulator,
    }

  })

  dialogRef.afterClosed().subscribe(result=>{
    if(result){

      // let model = result;
      // //Get DATA BASE ON THE SIMULATOR CATEGORY
      // switch (model.simulatorCategory){
      //   case 'media':
      //     this.getMediumSimulators()

      //     break;
      //   case 'alta':
      //     this.getHightSimulators();
      //   break;
      
      //   default:
      //     break;
      // }
    }
  })

  }

}
