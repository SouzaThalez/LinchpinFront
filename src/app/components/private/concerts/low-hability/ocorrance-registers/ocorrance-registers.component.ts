import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewLessonReportDialogComponent } from '../../../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';

@Component({
  selector: 'app-ocorrance-registers',
  templateUrl: './ocorrance-registers.component.html',
  styleUrl: './ocorrance-registers.component.scss'
})
export class OcorranceRegistersComponent implements OnInit{

  lessonReportData: any[];

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getLessonReports();
  }


  openPreviewLessonReportDialog(element: any){

   
    let dialogRef = this.matDialog.open(PreviewLessonReportDialogComponent,{
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

    let params = new HttpParams().set('lessonDescription', 'true');
    
    this.httpClient.get('http://localhost:3000/LessonReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          this.lessonReportData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

}
