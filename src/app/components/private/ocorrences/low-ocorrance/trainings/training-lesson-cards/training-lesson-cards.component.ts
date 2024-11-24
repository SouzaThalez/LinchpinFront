import { Component, model, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trainingLessonsData } from '../../../../../../data/trainingLessonsData';
import { ocorranceData } from '../../../../../../data/ocorranceData';
import { MatDialog } from '@angular/material/dialog';
import { OcorranceDialogComponent } from '../../ocorrance-dialog/ocorrance-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-training-lesson-cards',
  templateUrl: './training-lesson-cards.component.html',
  styleUrl: './training-lesson-cards.component.scss'
})
export class TrainingLessonCardsComponent implements OnInit{

  routeIndex:string;
  trainingData: Array<any> = [];

  constructor(
    private activeRoute:ActivatedRoute,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
  ){}

  ngOnInit(): void {

   this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      this.getTrainingLessons(this.routeIndex);

      
   })


  }

  openOcorranceDialog(lesson: any){

    let dialogRef = this.matDialog.open(OcorranceDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        lesson:lesson,
        lessonType: this.trainingData[0].value
      }
    })

    //training lesson
    dialogRef.afterClosed().subscribe(result=>{
      
      if(result){
        this.postLessonReports(result);
      }
    })

    
  }

  private postLessonReports(model:any){

    this.httpClient.post('http://localhost:3000/LessonReports',model)
    .subscribe({
        next: (sample: any)=>{
          
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private getTrainingLessons(id: string){
    
    let params = new HttpParams()
    .set('id', id);

    this.httpClient.get('http://localhost:3000/Trainings',{params}).subscribe({
      next:(sample:any)=>{
     
        this.trainingData = sample;
       
      },
      error: (erro)=>{console.log('request to Trainings  failed: ',erro);}
    })

  }


}
