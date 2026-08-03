import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-high-cleaning-details',
  templateUrl: './high-cleaning-details.component.html',
  styleUrl: './high-cleaning-details.component.scss'
})
export class HighCleaningDetailsComponent implements OnInit{


   routeName:string;
   routeIndex: string;
   simulatorData: any[];
   simulator: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(value =>{
      this.routeIndex =  value['index'];
      this.getSimulatorData(this.routeIndex);
    })
  }




  private getSimulatorData(index: string){
    
    this.httpClient.get('http://localhost:3000/CleaningReports').subscribe({
      
      next:(sample: any)=>{
        this.simulatorData = sample;
        this.simulator = this.simulatorData.find(element => element.id === index);
        console.log('SIMULATORDATA: ',this.simulatorData);
        console.log('SIMULATOR: ',this.simulator);
      },
      error:(error)=>{
        console.log('Something wrong with the request to CleaningReports ',error)
      },

    })

   
  }

}
