import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CleaningReport } from '../../../../../../models/cleaningReport';
import { environment } from '../../../../../../../environments/environment';
@Component({
  selector: 'app-high-cleaning-details',
  templateUrl: './high-cleaning-details.component.html',
  styleUrl: './high-cleaning-details.component.scss'
})
export class HighCleaningDetailsComponent implements OnInit{


   routeName:string;
   routeIndex: string;
   simulator: CleaningReport;

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

    this.httpClient.get<CleaningReport>(environment.apiUrl + '/cleaning-reports/' + index).subscribe({
      next:(report)=>{
        this.simulator = report;
      },
      error:(error)=>{
        console.log('Something wrong with the request to CleaningReports ',error)
      },
    })
  }

}
