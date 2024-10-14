import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteCodeDialogComponent } from '../delete-code-dialog/delete-code-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';

@Component({
  selector: 'app-new-simulator-dialog',
  templateUrl: './new-simulator-dialog.component.html',
  styleUrl: './new-simulator-dialog.component.scss'
})
export class NewSimulatorDialogComponent implements OnInit{


  constructor(
    public dialogRef: MatDialogRef<DeleteCodeDialogComponent>,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}

  ngOnInit(): void {
    
  }


  submitForm(){
    
  }







}
