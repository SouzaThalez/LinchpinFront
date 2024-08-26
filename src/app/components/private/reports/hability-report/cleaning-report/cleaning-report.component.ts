import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cleaning-report',
  templateUrl: './cleaning-report.component.html',
  styleUrl: './cleaning-report.component.scss'
})
export class CleaningReportComponent implements OnInit{

  cleaningData: any;


  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllCleaningReports();
    
  }



  private getAllCleaningReports(){

    let params = new HttpParams()
        .set('simulatorCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/CleaningReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          console.log('All cleaning reports: ',sample);
          this.cleaningData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }



}
