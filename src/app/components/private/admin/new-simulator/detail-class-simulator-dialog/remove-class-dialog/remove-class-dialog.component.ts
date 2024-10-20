import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-class-dialog',
  templateUrl: './remove-class-dialog.component.html',
  styleUrl: './remove-class-dialog.component.scss'
})
export class RemoveClassDialogComponent implements OnInit{
  
  constructor(
    public dialogRef: MatDialogRef<RemoveClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}

  ngOnInit(): void {
    console.log(this.data.simulatorData);
  }

  closeDialog(){
    this.dialogRef.close(this.data.simulatorData);
  }


}
