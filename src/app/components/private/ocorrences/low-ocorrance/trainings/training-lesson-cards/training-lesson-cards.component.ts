import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trainingLessonsData } from '../../../../../../data/trainingLessonsData';

@Component({
  selector: 'app-training-lesson-cards',
  templateUrl: './training-lesson-cards.component.html',
  styleUrl: './training-lesson-cards.component.scss'
})
export class TrainingLessonCardsComponent implements OnInit{

  routeIndex:any;
  trainingData = trainingLessonsData
  constructor(
    private activeRoute:ActivatedRoute,
  ){}

  ngOnInit(): void {

   this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      console.log(this.routeIndex)
   })

   console.log(this.trainingData)

  }

}
