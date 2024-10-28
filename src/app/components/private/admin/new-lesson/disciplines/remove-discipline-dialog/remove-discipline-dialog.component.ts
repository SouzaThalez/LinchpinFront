import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-remove-discipline-dialog',
  templateUrl: './remove-discipline-dialog.component.html',
  styleUrl: './remove-discipline-dialog.component.scss'
})
export class RemoveDisciplineDialogComponent implements OnInit{


  constructor(
    public dialogRef: MatDialogRef<RemoveDisciplineDialogComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {
      disciplines:any;
    },
  ){}

  ngOnInit(): void {
   console.log(this.data.disciplines)
  }

}
