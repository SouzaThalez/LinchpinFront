import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lesson-report',
  templateUrl: './lesson-report.component.html',
  styleUrl: './lesson-report.component.scss'
})
export class LessonReportComponent implements OnInit{
 
  lessonData: any;


  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllCleaningReports();
    
  }



  private getAllCleaningReports(){

    // let params = new HttpParams()
    //     .set('simulatorCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/LessonReports/')
    .subscribe({
        next: (sample: any)=>{
          console.log('All cleaning reports: ',sample);
          this.lessonData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

}
