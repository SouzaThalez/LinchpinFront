import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-manitance-report-dialog',
  templateUrl: './preview-manitance-report-dialog.component.html',
  styleUrl: './preview-manitance-report-dialog.component.scss'
})
export class PreviewManitanceReportDialogComponent implements OnInit{
  
  constructor(
    public dialogRef: MatDialogRef<PreviewManitanceReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}
  
  ngOnInit(): void {
    console.log('PREVIEW Cleaning report dialog Data: ',this.data)
  }


}
