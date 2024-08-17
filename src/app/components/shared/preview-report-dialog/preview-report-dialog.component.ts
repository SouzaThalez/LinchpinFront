import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-preview-report-dialog',
  templateUrl: './preview-report-dialog.component.html',
  styleUrl: './preview-report-dialog.component.scss'
})
export class PreviewReportDialogComponent implements OnInit{

  isCurseReport: boolean = false;
  isLessonReport: boolean = false;
  isSimulatorReport: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PreviewReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      reportData: any,
      isCleaningReport:boolean
      simulator: any,
      lesson:any,
      curse:any
      isLessonData:boolean,
      isSimulatorData:boolean,
      isCurseData:boolean
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
