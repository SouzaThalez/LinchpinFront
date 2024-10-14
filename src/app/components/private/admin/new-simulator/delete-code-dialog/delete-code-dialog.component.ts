import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-code-dialog',
  templateUrl: './delete-code-dialog.component.html',
  styleUrl: './delete-code-dialog.component.scss'
})
export class DeleteCodeDialogComponent implements OnInit{


  constructor(
    public dialogRef: MatDialogRef<DeleteCodeDialogComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorCode: any
    },
  ){}

  ngOnInit(): void {
    // console.log(this.data.simulatorData)
  }


  closeDialog(){
    this.dialogRef.close(this.data.simulatorCode);
  }

}
