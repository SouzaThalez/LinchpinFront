import { Component, Inject, OnInit } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medium-cleaning-dialog',
  templateUrl: './medium-cleaning-dialog.component.html',
  styleUrl: './medium-cleaning-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class MediumCleaningDialogComponent implements OnInit{

  checked = false;
  textMsg = 'Não houve achados durante a limpeza deste simulador';

  constructor(
    public dialogRef: MatDialogRef<MediumCleaningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit(): void {

   
  }

  onClose(value: string): void {
    this.dialogRef.close(value);
  }


  checkBox(value: any){
    this.checked = value;
  } 

}
