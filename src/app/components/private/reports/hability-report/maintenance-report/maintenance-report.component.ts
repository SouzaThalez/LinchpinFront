import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-maintenance-report',
  templateUrl: './maintenance-report.component.html',
  styleUrl: './maintenance-report.component.scss'
})
export class MaintenanceReportComponent implements OnInit{


  manitenceData: any;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllManitenceReports();
    
  }



  private getAllManitenceReports(){

    let params = new HttpParams()
        .set('simulatorCategory', 'baixa')
        .set('hasDescription','true');
    
    this.httpClient.get('http://localhost:3000/CleaningReports/',{params})
    .subscribe({
        next: (sample: any)=>{
          console.log('All manitence reports: ',sample);
          this.manitenceData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

}
