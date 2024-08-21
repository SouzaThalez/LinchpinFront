import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewCleaningReportDialogComponent } from '../../../../shared/preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';
import { InterventionReportDialogComponent } from '../../../../shared/intervention-report-dialog/intervention-report-dialog.component';

@Component({
  selector: 'app-cleaning-registers',
  templateUrl: './cleaning-registers.component.html',
  styleUrl: './cleaning-registers.component.scss'
})
export class CleaningRegistersComponent implements OnInit{

  cleaningData: any[];
  selectedReport:any;

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

  openInterventionReport(report: any){

    let dialogRef = this.matDialog.open(InterventionReportDialogComponent,{
      disableClose: true,
      width:'650px',
    })

    dialogRef.afterClosed().subscribe(result=>{
  debugger
      if(result){
        this.getSelectedReport(result);
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

  private getSelectedReport(report:any){

    this.httpClient.get('http://localhost:3000/CleaningReports/' + report.id)
    .subscribe({
        next: (sample: any)=>{
          console.log('request to specific report!: ',sample);
          this.selectedReport = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

}
