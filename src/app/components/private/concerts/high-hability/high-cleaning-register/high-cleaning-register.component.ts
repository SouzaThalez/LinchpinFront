import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewCleaningReportDialogComponent } from '../../../../shared/preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';

@Component({
  selector: 'app-high-cleaning-register',
  templateUrl: './high-cleaning-register.component.html',
  styleUrl: './high-cleaning-register.component.scss'
})
export class HighCleaningRegisterComponent implements OnInit{
  
  
  cleaningData: any[];

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog
  ){}


  ngOnInit(): void {
    this.getCleaningReports();
  }


  openPreviewCleaningReportDialog(element: any){
    
    let dialogRef = this.matDialog.open(PreviewCleaningReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        simulatorData: element,
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
      .set('simulatorCategory', 'alta');
    
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
