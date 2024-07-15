import { Component, Inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-low-fidelity-cleaning-dialog',
  templateUrl: './low-fidelity-cleaning-dialog.component.html',
  styleUrl: './low-fidelity-cleaning-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class LowFidelityCleaningDialogComponent implements OnInit{

  checked = false;
  textMsg = 'mensagwem';

  constructor(
    public dialogRef: MatDialogRef<LowFidelityCleaningDialogComponent>,
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
