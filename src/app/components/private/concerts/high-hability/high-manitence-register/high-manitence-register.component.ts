import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewLessonReportDialogComponent } from '../../../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';

@Component({
  selector: 'app-high-manitence-register',
  templateUrl: './high-manitence-register.component.html',
  styleUrl: './high-manitence-register.component.scss'
})
export class HighManitenceRegisterComponent implements OnInit{


  manitanceData: any[];

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog
  ){}


  ngOnInit(): void {
    this.getManitenceReports();
  }


  openPreviewCleaningReportDialog(element: any){
    
    let dialogRef = this.matDialog.open(PreviewLessonReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        reportData: element,
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }




  private getManitenceReports(){

    let params = new HttpParams()
        .set('hasDescription', 'true');
        // .set('manitanceCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/manitanceReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          console.log('request to prepared class  ok!: ',sample);
          this.manitanceData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
