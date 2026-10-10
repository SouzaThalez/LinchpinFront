import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent implements OnInit{

  
  trainingLessons:any;

  constructor(
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getTrainingLessons();
  }


  private getTrainingLessons(){

    this.httpClient.get(environment.apiUrl + '/trainings').subscribe({
      next:(sample:any)=>{
        this.trainingLessons = sample;
      },
      error: (erro)=>{console.log('request to Trainings  failed: ',erro);}
    })

  }


}
