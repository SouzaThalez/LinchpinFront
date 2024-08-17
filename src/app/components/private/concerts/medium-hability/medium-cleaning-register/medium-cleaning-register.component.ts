import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewReportDialogComponent } from '../../../../shared/preview-report-dialog/preview-report-dialog.component';

@Component({
  selector: 'app-medium-cleaning-register',
  templateUrl: './medium-cleaning-register.component.html',
  styleUrl: './medium-cleaning-register.component.scss'
})
export class MediumCleaningRegisterComponent implements OnInit{

  cleaningData: any[];

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog
  ){}


  ngOnInit(): void {
    this.getCleaningReports();
  }


  openPreviewReportDialog(element: any){
    
    let dialogRef = this.matDialog.open(PreviewReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        simulator: element,
        isCleaningReport: true
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

  private getCleaningReports(){
    // returns data who meets theese 2 conditions
    let params = new HttpParams()
      .set('hasDescription', 'true')
      .set('simulatorCategory', 'media');
    
    this.httpClient.get('http://localhost:3000/CleaningReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          console.log('request!: ',sample);
          this.cleaningData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  
}
