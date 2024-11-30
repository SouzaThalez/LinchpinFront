import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { PreviewLessonReportDialogComponent } from '../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { UserLogedService } from '../../../service/user-loged.service';
import { User } from '../../../models/user';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
  ];

  lessonData: any;
  scenariosData:any;
  cleaningData: any;

  currentUser: User;

  recentReportsData ={
    scenarios:[],
    lessons:[]
  }
    
  
  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private userLogedService : UserLogedService
  ){}


  ngOnInit(): void {

    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });

    
    this.callGeneralChart();
    this.getAllCleaningReports();
    this.getAllData();
  }


  openPreviewLessonDialog(element: any){


    let dialogRef = this.matDialog.open(PreviewLessonReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{reportData:element}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })


  }

  //Graphics
  private callGeneralChart(){
    
      const ctx = document.getElementById('generalChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [{
            label: 'N° relatórios',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
             legend: {
                display: false
              }
          }
        }
      });
  
      
  
  }

  private getAllData(){

    const lessonParams = new HttpParams().set('lessonDescription', 'true');
    const scenarioParams = new HttpParams().set('scenarioCategory', 'Corrida'); 
    
    forkJoin({
      lessons: this.httpClient.get('http://localhost:3000/LessonReports/', { params: lessonParams }),
      scenarios: this.httpClient.get('http://localhost:3000/ScenarioReports/', { params: scenarioParams })
    }).subscribe({
      next: (results: any) => {
        // Process the combined results
        this.lessonData = results.lessons;
        this.scenariosData = results.scenarios;
  
        this.recentReportsData = {
          lessons: this.lessonData,
          scenarios: this.scenariosData
        };

      },
      error: (error) => {
        console.log('Error with one or more requests:', error);
      }
    });
    
  }

  private getAllCleaningReports(){

     // only for counting cleaning reperts total
    // This is not optimal
    
    this.httpClient.get('http://localhost:3000/CleaningReports/')
    .subscribe({
        next: (sample: any)=>{
          // console.log('CleaningReports-: ',sample);
          this.cleaningData = sample;
          
        },
        error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
    })
  }


}
