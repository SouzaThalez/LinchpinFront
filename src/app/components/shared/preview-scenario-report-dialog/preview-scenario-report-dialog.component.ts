import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-scenario-report-dialog',
  templateUrl: './preview-scenario-report-dialog.component.html',
  styleUrl: './preview-scenario-report-dialog.component.scss'
})
export class PreviewScenarioReportDialogComponent implements OnInit{
 
  
  constructor(
    public dialogRef: MatDialogRef<PreviewScenarioReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      scenarioData: any
    },
  ){}


  ngOnInit(): void {
  console.log(this.data.scenarioData)
  }


}
