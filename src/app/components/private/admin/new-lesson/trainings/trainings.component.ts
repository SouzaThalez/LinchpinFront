import { Component, Inject, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';
import { NewTrainingDialogComponent } from './new-training-dialog/new-training-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewLessonDialogComponent } from '../new-lesson-dialog/new-lesson-dialog.component';
import { EditLessonDialogComponent } from '../edit-lesson-dialog/edit-lesson-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent implements OnInit{

  cardType = ocorranceData.trainingTypes;
  trainingValue = 0;
  trainingLessons: any;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}


  ngOnInit(): void {
    this.getTrainingLessons();
   
  }



  openNewTrainingDialog(){

    let dialogRef = this.matDialog.open(NewTrainingDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{}
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
      
 

      }
    })
  }

  openNewLessonDialog(){

    let dialogRef = this.matDialog.open(NewLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{}
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
      
      }
    })

  }

  openEditLessonDialog(lesson:any){

    let dialogRef = this.matDialog.open(EditLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{lessonData:lesson}
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
      
      }
    })


  }

  private getTrainingLessons(){

    this.httpClient.get('http://localhost:3000/Trainings').subscribe({
      next:(sample:any)=>{
        this.trainingLessons = sample
      },
      error: (erro)=>{console.log('request to Trainings  failed: ',erro);}
    })

  }

}
