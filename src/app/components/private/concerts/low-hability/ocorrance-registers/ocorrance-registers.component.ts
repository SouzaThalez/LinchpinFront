import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewReportDialogComponent } from '../../../../shared/preview-report-dialog/preview-report-dialog.component';

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


  openPreviewReportDialog(element: any){

    // let dialogRef : any ;
    
    // if(element.lessonCategory == "Treinamento Habilidade"){
     
    //   dialogRef = this.matDialog.open(PreviewReportDialogComponent,{
    //     disableClose: true,
    //     width:'650px',
    //     data:{
    //       lesson: element,
    //       isLessonData: true
    //     }
    //   })

    //   return
    // }
    
    // if(element.lessonCategory == "curso"){

    //   dialogRef = this.matDialog.open(PreviewReportDialogComponent,{
    //     disableClose: true,
    //     width:'650px',
    //     data:{
    //       curse: element,
    //       isCurseData: true
    //     }
    //   })

    //   return
    // }

    // dialogRef.afterClosed().subscribe(result=>{
    //   if(result){
        
    //   }
    // })

 

    let dialogRef = this.matDialog.open(PreviewReportDialogComponent,{
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
          console.log('request to prepared class  ok!: ',sample);
          this.lessonReportData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

}
