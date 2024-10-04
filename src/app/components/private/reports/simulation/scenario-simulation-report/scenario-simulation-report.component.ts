import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviewScenarioReportDialogComponent } from '../../../../shared/preview-scenario-report-dialog/preview-scenario-report-dialog.component';

@Component({
  selector: 'app-scenario-simulation-report',
  templateUrl: './scenario-simulation-report.component.html',
  styleUrl: './scenario-simulation-report.component.scss'
})
export class ScenarioSimulationReportComponent implements OnInit{



  scenarioReportsData: any;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllScenarioReports();
    
  }


  openPreviewScenarioReport(element: any){

    let dialogRef = this.matDialog.open(PreviewScenarioReportDialogComponent,{
        disableClose: true,
        width:'650px',
        data:{scenarioData:element}
      })
  
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          
        }
      })
  
  }




  private getAllScenarioReports(){

    // let params = new HttpParams()
    //     .set('simulatorCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/ScenarioReports/')
    .subscribe({
        next: (sample: any)=>{
          console.log('All scenarioreports: ',sample);
          this.scenarioReportsData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
