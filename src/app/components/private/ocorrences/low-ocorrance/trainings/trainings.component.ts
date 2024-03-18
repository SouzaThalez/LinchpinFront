import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';


@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent implements OnInit{

  cardType = ocorranceData.trainingTypes;

  ngOnInit(): void {
    
  }

}
