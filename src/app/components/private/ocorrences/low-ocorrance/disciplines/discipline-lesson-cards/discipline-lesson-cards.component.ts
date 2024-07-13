import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ocorranceData } from '../../../../../../data/ocorranceData';

@Component({
  selector: 'app-discipline-lesson-cards',
  templateUrl: './discipline-lesson-cards.component.html',
  styleUrl: './discipline-lesson-cards.component.scss'
})
export class DisciplineLessonCardsComponent implements OnInit{


  routeIndex:any;
  disciplines = ocorranceData.disciplineTypes;
  discipline: any;

  constructor(
    private activeRoute:ActivatedRoute,
  ){}
  
  ngOnInit(): void {

    this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      this.discipline = this.disciplines[this.routeIndex];
      console.log(this.discipline)
  
   })
  
  }




}
