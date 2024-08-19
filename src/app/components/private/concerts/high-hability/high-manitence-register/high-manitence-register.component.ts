import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-high-manitence-register',
  templateUrl: './high-manitence-register.component.html',
  styleUrl: './high-manitence-register.component.scss'
})
export class HighManitenceRegisterComponent implements OnInit{


  manitanceData: any[];

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog
  ){}


  ngOnInit(): void {
    this.getManitenceReports();
  }

  private getManitenceReports(){

    let params = new HttpParams()
        .set('hasDescription', 'true');
        // .set('manitanceCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/manitanceReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          console.log('request to prepared class  ok!: ',sample);
          this.manitanceData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
