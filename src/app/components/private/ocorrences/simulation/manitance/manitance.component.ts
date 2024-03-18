import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';

@Component({
  selector: 'app-manitance',
  templateUrl: './manitance.component.html',
  styleUrl: './manitance.component.scss'
})
export class ManitanceComponent implements OnInit{

  manitance = ocorranceData.manitanceTypes;
  constructor(){}
  ngOnInit(): void {
    
  }
}
