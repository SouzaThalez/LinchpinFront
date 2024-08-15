import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-preview-report-dialog',
  templateUrl: './preview-report-dialog.component.html',
  styleUrl: './preview-report-dialog.component.scss'
})
export class PreviewReportDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<PreviewReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: any
    },
  ){}

  ngOnInit(): void {
    // console.log(this.data.simulator)
    
  }
    

}
