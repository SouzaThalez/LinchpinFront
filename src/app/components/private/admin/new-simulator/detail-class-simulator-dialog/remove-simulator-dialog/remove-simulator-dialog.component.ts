import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-remove-simulator-dialog',
  templateUrl: './remove-simulator-dialog.component.html',
  styleUrl: './remove-simulator-dialog.component.scss'
})
export class RemoveSimulatorDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<RemoveSimulatorDialogComponent>,
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

  closeDialog(){
    this.dialogRef.close();
  }







}
