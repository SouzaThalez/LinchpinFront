import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-simulator-report-dialog',
  templateUrl: './preview-simulator-report-dialog.component.html',
  styleUrl: './preview-simulator-report-dialog.component.scss'
})
export class PreviewSimulatorReportDialogComponent implements OnInit{
    
  isCurseReport: boolean = false;
  isLessonReport: boolean = false;
  isSimulatorReport: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<PreviewSimulatorReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      reportData: any
    },
  ){}
  
  ngOnInit(): void {
 
    if(this.data.reportData.lessonCategory == 'Treinamento Habilidade'){
      this.isLessonReport = true
    }
    if(this.data.reportData.lessonCategory == 'curso'){
      this.isCurseReport = true
    }
  }

}
