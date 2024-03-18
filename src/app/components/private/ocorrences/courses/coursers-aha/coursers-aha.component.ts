import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';

@Component({
  selector: 'app-coursers-aha',
  templateUrl: './coursers-aha.component.html',
  styleUrl: './coursers-aha.component.scss'
})
export class CoursersAhaComponent implements OnInit{

  coursers = ocorranceData.coursersType;

  ngOnInit(): void {
    
  }
}
