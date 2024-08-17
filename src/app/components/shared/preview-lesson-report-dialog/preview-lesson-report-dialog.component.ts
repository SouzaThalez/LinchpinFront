import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-lesson-report-dialog',
  templateUrl: './preview-lesson-report-dialog.component.html',
  styleUrl: './preview-lesson-report-dialog.component.scss'
})
export class PreviewLessonReportDialogComponent implements OnInit{
  
  isCurseReport: boolean = false;
  isLessonReport: boolean = false;
  isSimulatorReport: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<PreviewLessonReportDialogComponent>,
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
