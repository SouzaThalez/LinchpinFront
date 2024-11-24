import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.scss'
})
export class DisciplinesComponent implements OnInit{

  
  disciplines: any;
  constructor(
    private httpClient: HttpClient,
  ){}
  ngOnInit(): void {
    this.getDisciplineLessons();
  }
   
  
  private getDisciplineLessons(){

    this.httpClient.get('http://localhost:3000/Disciplines').subscribe({
      next:(sample:any)=>{
        this.disciplines = sample;
      },
      error: (erro)=>{console.log('request to Disciplines  failed: ',erro);}
    })

  }




}
