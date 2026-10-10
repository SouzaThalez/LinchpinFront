import { Component, OnInit } from '@angular/core';
import { simulatorTypes } from '../../../../data/simulatorTypes';
import { simulators } from '../../../../data/simulators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-low-fidelity',
  templateUrl: './low-fidelity.component.html',
  styleUrl: './low-fidelity.component.scss'
})
export class LowFidelityComponent implements OnInit{

  simTypes = simulatorTypes;
  simulatorClasses = simulators.lowFidelity;
  lowSimulators: any;

  constructor(
    private httpClient: HttpClient
    
  ){}

  ngOnInit(): void {
    this.getLowSimulators();
  }



  private getLowSimulators(){

    this.httpClient.get(environment.apiUrl + '/simulator-classes').subscribe({
      next:(sample: any)=>{
        
        this.lowSimulators = sample;
       
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }



}
