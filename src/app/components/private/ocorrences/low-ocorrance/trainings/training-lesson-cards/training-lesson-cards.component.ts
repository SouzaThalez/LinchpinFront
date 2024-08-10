import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trainingLessonsData } from '../../../../../../data/trainingLessonsData';
import { ocorranceData } from '../../../../../../data/ocorranceData';
import { MatDialog } from '@angular/material/dialog';
import { OcorranceDialogComponent } from '../../ocorrance-dialog/ocorrance-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-training-lesson-cards',
  templateUrl: './training-lesson-cards.component.html',
  styleUrl: './training-lesson-cards.component.scss'
})
export class TrainingLessonCardsComponent implements OnInit{

  routeIndex:any;
  trainingData = ocorranceData.trainingTypes;
  training:any;

  constructor(
    private activeRoute:ActivatedRoute,
    private matDialog: MatDialog,
  ){}

  ngOnInit(): void {

   this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
    
      this.training = this.trainingData[this.routeIndex];
      
   })


  }

  openOcorranceDialog(lesson: any){

    let dialogRef = this.matDialog.open(OcorranceDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        lesson:lesson,
        lessonType: this.training
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })

    
  }



}
