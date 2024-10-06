import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviewManitanceReportDialogComponent } from '../../../../shared/preview-manitance-report-dialog/preview-manitance-report-dialog.component';

@Component({
  selector: 'app-maintenance-simulation-report',
  templateUrl: './maintenance-simulation-report.component.html',
  styleUrl: './maintenance-simulation-report.component.scss'
})
export class MaintenanceSimulationReportComponent implements OnInit{


  manitanceReportData: any;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllCleaningReports();
    
  }

  openPreviewCleaningDialog(element: any){


    let dialogRef = this.matDialog.open(PreviewManitanceReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{simulatorData:element}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })


  }

  private getAllCleaningReports(){

    // let params = new HttpParams()
    //     .set('simulatorCategory', 'alta');
    
    this.httpClient.get('http://localhost:3000/manitanceReports/')
    .subscribe({
        next: (sample: any)=>{
          console.log('All manitanceReportData: ',sample);
          this.manitanceReportData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
