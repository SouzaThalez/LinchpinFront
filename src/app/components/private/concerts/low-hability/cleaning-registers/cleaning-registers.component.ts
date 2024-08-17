import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewReportDialogComponent } from '../../../../shared/preview-report-dialog/preview-report-dialog.component';

@Component({
  selector: 'app-cleaning-registers',
  templateUrl: './cleaning-registers.component.html',
  styleUrl: './cleaning-registers.component.scss'
})
export class CleaningRegistersComponent implements OnInit{

  cleaningData: any[];

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog
  ){}


  ngOnInit(): void {
    this.getCleaningReports();
  }

  openPreviewReportDialog(element: any){
    
    debugger
    let dialogRef = this.matDialog.open(PreviewReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        simulator: element,
        reportData: element,
        isCleaningReport: true
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

  private getCleaningReports(){

    let params = new HttpParams()
        .set('hasDescription', 'true')
        .set('simulatorCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/CleaningReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          console.log('request to prepared class  ok!: ',sample);
          this.cleaningData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

}
