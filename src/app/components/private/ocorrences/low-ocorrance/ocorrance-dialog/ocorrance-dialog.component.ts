import { Component, Inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ocorrance-dialog',
  templateUrl: './ocorrance-dialog.component.html',
  styleUrl: './ocorrance-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class OcorranceDialogComponent implements OnInit{

  
  checked = false;
  textMsg = 'mensagwem';

  constructor(
    public dialogRef: MatDialogRef<OcorranceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}
  
  ngOnInit(): void {
    
  } 

  
  onClose(value: string): void {
    this.dialogRef.close(value);
  }


  checkBox(value: any){
  }

}
