import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-cleaning-report-dialog',
  templateUrl: './preview-cleaning-report-dialog.component.html',
  styleUrl: './preview-cleaning-report-dialog.component.scss'
})
export class PreviewCleaningReportDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<PreviewCleaningReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}
  
  ngOnInit(): void {
    
  }

}
