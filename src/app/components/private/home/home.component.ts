import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { PreviewLessonReportDialogComponent } from '../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { User } from '../../models/user';
import { UserLogedService } from '../../../service/user-loged.service';

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


    // this.userLogedService.logedUserSubject.subscribe(({
    //   next:(result: User)=>{ 
    //     this.currentUser = result;
    //     console.log('from HOMe COMPONENT', this.currentUser)

    //   },
    //   error:(error)=>{console.log('Erro carregando usuário!'), error}
    // }))

    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });

    
    this.callGeneralChart();
    // this.getAllLessonReports();
    // this.getAllScenariosReports();
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

    // get both data !
    // lessons and scenarios 

    let params = new HttpParams()
    .set('lessonDescription', 'true');

    this.httpClient.get('http://localhost:3000/LessonReports/',{params})
    .subscribe({
        next: (sample: any)=>{
          this.lessonData = sample;
          this.recentReportsData.lessons = this.lessonData;
          
        },
        error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
    })

    this.httpClient.get('http://localhost:3000/ScenarioReports/')
    .subscribe({
        next: (sample: any)=>{
         
          this.scenariosData = sample;
          this.recentReportsData.scenarios = this.scenariosData;
        
        },
        error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
    })

    console.log(this.recentReportsData)
    
  }



  // private getAllLessonReports(){

  //   let params = new HttpParams()
  //       .set('lessonDescription', 'true');
    
  //   this.httpClient.get('http://localhost:3000/LessonReports/',{params})
  //   .subscribe({
  //       next: (sample: any)=>{
  //         // console.log('LessonReports-: ',sample);
  //         this.lessonData = sample;
  //         this.recentReportsData.lessons = this.lessonData;
          
  //       },
  //       error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
  //   })
  // }
  
  // private getAllScenariosReports(){
    
  //   this.httpClient.get('http://localhost:3000/ScenarioReports/')
  //   .subscribe({
  //       next: (sample: any)=>{
  //         // console.log('CleaningReports-: ',sample);
  //         this.scenariosData = sample;
  //         this.recentReportsData.scenarios = this.scenariosData;
        
  //       },
  //       error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
  //   })
  // }
  
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
