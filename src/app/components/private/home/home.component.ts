import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables, CategoryScale, LinearScale } from 'chart.js';
import { PreviewLessonReportDialogComponent } from '../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { PreviewScenarioReportDialogComponent } from '../../shared/preview-scenario-report-dialog/preview-scenario-report-dialog.component';
import { UserLogedService } from '../../../service/user-loged.service';
import { User } from '../../../models/user';
import { forkJoin } from 'rxjs';
import { userRoleType } from '../../../enums/userRoles';
import { PreviewCleaningReportDialogComponent } from '../../shared/preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';

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
  
  userRoleAdmin =  userRoleType.admin;
  lessonData: any;
  scenariosData: any;
  cleaningData: any;
  cleaningCountData: any;

  currentUser: User;

  recentReportsData ={
    scenarios:[],
    lessons:[],
    cleanings:[]
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
        if(this.currentUser.role == this.userRoleAdmin){
          this.getAllData();
        }else{
          this.getUserRportsData(this.currentUser);
        }
       
      }
    });

    
    this.callGeneralChart();
    this.getAllCleaningReports();
    
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

  openPreviewLessonReportDialog(element: any){

   
    let dialogRef = this.matDialog.open(PreviewLessonReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        reportData: element
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
    
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


  //Graphics
  private callGeneralChart(){

    Chart.register(...registerables, CategoryScale, LinearScale);
    
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
            x: {
              type: 'category', // Default scale for x-axis
            },
            y: {
              type: 'linear', // Linear scale for y-axis
            },
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
    const cleaningParams = new HttpParams().set('hasDescription', 'true'); 
    
    forkJoin({
      lessons: this.httpClient.get('http://localhost:3000/LessonReports/', { params: lessonParams }),
      scenarios: this.httpClient.get('http://localhost:3000/ScenarioReports/', { params: scenarioParams }),
      cleanings: this.httpClient.get('http://localhost:3000/CleaningReports/', { params: cleaningParams })
    }).subscribe({
      next: (results: any) => {
        // Process the combined results
        this.lessonData = results.lessons;
        this.scenariosData = results.scenarios;
        this.cleaningData = results.cleanings;
  
        this.recentReportsData = {
          lessons: this.lessonData,
          scenarios: this.scenariosData,
          cleanings: this.cleaningData
        };

        // console.log(this.recentReportsData);
      },
      error: (error) => {
        console.log('Error with one or more requests:', error);
      }
    });
    
  }

  private getUserRportsData(userLoged: User){

    const lessonParams = new HttpParams()
        .set('lessonDescription', 'true')
        .set('user.name',this.currentUser.name);

    const scenarioParams = new HttpParams()
         .set('scenarioCategory', 'Corrida')
         .set('user.name',this.currentUser.name);
         
    const cleaningParams = new HttpParams()
          // .set('hasDescription', 'true')
          .set('user.name',this.currentUser.name);
    
    forkJoin({
      lessons: this.httpClient.get('http://localhost:3000/LessonReports/', { params: lessonParams }),
      scenarios: this.httpClient.get('http://localhost:3000/ScenarioReports/', { params: scenarioParams }),
      cleanings: this.httpClient.get('http://localhost:3000/CleaningReports/', { params: cleaningParams })
    }).subscribe({
      next: (results: any) => {
        // Process the combined results
        this.lessonData = results.lessons;
        this.scenariosData = results.scenarios;
        this.cleaningData = results.cleanings;
  
        this.recentReportsData = {
          lessons: this.lessonData,
          scenarios: this.scenariosData,
          cleanings: this.cleaningData
        };

        // console.log(this.recentReportsData);

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
          this.cleaningCountData = sample;
          
        },
        error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
    })
  }


}
