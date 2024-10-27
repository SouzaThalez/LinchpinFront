import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../models/user';


@Component({
  selector: 'app-remove-user-dialog',
  templateUrl: './remove-user-dialog.component.html',
  styleUrl: './remove-user-dialog.component.scss'
})
export class RemoveUserDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<RemoveUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user:User
    },
  ){}


  ngOnInit(): void {
    
  }

  closeDialog(){
    this.dialogRef.close(this.data.user);
  }

}
