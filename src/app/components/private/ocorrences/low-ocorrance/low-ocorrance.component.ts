import { Component, OnInit } from '@angular/core';
import { trainingTypes } from '../../../../data/trainingTypes';

@Component({
  selector: 'app-low-ocorrance',
  templateUrl: './low-ocorrance.component.html',
  styleUrl: './low-ocorrance.component.scss'
})
export class LowOcorranceComponent implements OnInit{


  cardType = trainingTypes;
  constructor(){}

  ngOnInit(): void {
    
  }

}
