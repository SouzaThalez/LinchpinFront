import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

}
