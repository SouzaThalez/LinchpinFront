import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-simulator-dialog',
  templateUrl: './delete-simulator-dialog.component.html',
  styleUrl: './delete-simulator-dialog.component.scss'
})
export class DeleteSimulatorDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DeleteSimulatorDialogComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: any
    },
  ){}

  ngOnInit(): void {
    // console.log(this.data.simulator)
  }


  closeDialog(){
    this.dialogRef.close(this.data.simulator);
  }

}
