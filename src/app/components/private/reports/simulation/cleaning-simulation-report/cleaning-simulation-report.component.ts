import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cleaning-simulation-report',
  templateUrl: './cleaning-simulation-report.component.html',
  styleUrl: './cleaning-simulation-report.component.scss'
})
export class CleaningSimulationReportComponent implements OnInit{


   cleaningReportData: any;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllCleaningReports();
    
  }

  openPreviewLessonDialog(element: any){


    // let dialogRef = this.matDialog.open(PreviewCleaningReportDialogComponent,{
    //   disableClose: true,
    //   width:'650px',
    //   data:{simulatorData:element}
    // })

    // dialogRef.afterClosed().subscribe(result=>{
    //   if(result){
        
    //   }
    // })


  }

  private getAllCleaningReports(){

    let params = new HttpParams()
        .set('simulatorCategory', 'alta');
    
    this.httpClient.get('http://localhost:3000/CleaningReports/',{params})
    .subscribe({
        next: (sample: any)=>{
          console.log('All scenarioreports: ',sample);
          this.cleaningReportData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
