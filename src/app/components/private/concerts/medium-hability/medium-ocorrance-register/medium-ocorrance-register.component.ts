import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewReportDialogComponent } from '../../../../shared/preview-report-dialog/preview-report-dialog.component';
import { PreviewLessonReportDialogComponent } from '../../../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { PreviewSimulatorReportDialogComponent } from '../../../../shared/preview-simulator-report-dialog/preview-simulator-report-dialog.component';

@Component({
  selector: 'app-medium-ocorrance-register',
  templateUrl: './medium-ocorrance-register.component.html',
  styleUrl: './medium-ocorrance-register.component.scss'
})
export class MediumOcorranceRegisterComponent implements OnInit{



  lessonData: any[];

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog
  ){}


  
  ngOnInit(): void {
    this.getLessonReports();
  }

  openPreviewSimulatorReportDialog(element: any){
    
    let dialogRef = this.matDialog.open(PreviewSimulatorReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        reportData: element
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

  private getLessonReports(){
    // returns data who meets theese 2 conditions
    let params = new HttpParams()
      .set('simulatorDescription', 'true');
    
    this.httpClient.get('http://localhost:3000/LessonReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          console.log('request!: ',sample);
          this.lessonData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }



}
