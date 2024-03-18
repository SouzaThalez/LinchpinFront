import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.scss'
})
export class DisciplinesComponent implements OnInit{


  disciplines = ocorranceData.disciplineTypes;
  constructor(){}
  ngOnInit(): void {
    
  }

}
