import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-remove',
  templateUrl: './confirm-remove.component.html',
  styleUrl: './confirm-remove.component.scss'
})
export class ConfirmRemoveComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ConfirmRemoveComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      lessonData: any
    },
  ){}

  ngOnInit(): void {
   
  }


  closeDialog(){
    this.dialogRef.close(this.data.lessonData);
  }

}
