import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';
import { NewTrainingDialogComponent } from './new-training-dialog/new-training-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NewLessonDialogComponent } from '../new-lesson-dialog/new-lesson-dialog.component';
import { EditLessonDialogComponent } from '../disciplines/edit-lesson-dialog/edit-lesson-dialog.component';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemoveLessonDialogComponent } from '../remove-lesson-dialog/remove-lesson-dialog.component';
import moment from 'moment';
import { Training } from '../../../../../models/training';
import { Lesson } from '../../../../../models/lesson';
import { LessonApiService } from '../../../../../service/lesson-api.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent implements OnInit{

  cardType = ocorranceData.trainingTypes;
  trainingValue = 0;
  trainingLessons: Training[];

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private lessonApiService: LessonApiService
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
        this.postTrainingLesson(result);
      }
    })
  }

  openNewLessonDialog(){

    let dialogRef = this.matDialog.open(NewLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        trainingData: this.trainingLessons,
        dialogType:'Treinamento'
      }

    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.addLesson(result.lesson, result.groupId);
      }
    })

  }

  openEditLessonDialog(lesson: Lesson){

    const trainingId = this.trainingLessons[this.trainingValue].id;

    let dialogRef = this.matDialog.open(EditLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{lesson:lesson}

    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
        const convertedDate = moment(model.updateDate).format('DD-MM-YYYY');
        model.updateDate = convertedDate;
        this.updateLesson(model, trainingId);
      }
    })


  }



  openRemoveLessonDialog(){

    let dialogRef = this.matDialog.open(RemoveLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        dataName:'Treinamentos'
      }

    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result == false){
        this.trainingValue = 0;
        this.getTrainingLessons();
      }
    })
  }



  private getTrainingLessons(){

    this.lessonApiService.listGroups('trainings').subscribe({
      next:(trainings)=>{
        this.trainingLessons = trainings;
      },
      error: (erro)=>{console.log('request to Trainings  failed: ',erro);}
    })

  }

  private postTrainingLesson(model:any){

    this.lessonApiService.createGroup('trainings', model).subscribe({
      next: ()=>{
        this.openSnackBar('Nova Treinamento adicionado com sucesso!');
        this.getTrainingLessons();
      },
      error: (erro)=>{this.openSnackBar(erro.error?.title ?? 'ERRO ao adicionar o treinamento!');}
    })
  }

  private addLesson(lesson: any, trainingId: number){

    this.lessonApiService.addLesson('trainings', trainingId, lesson).subscribe({
      next: ()=>{
        this.openSnackBar('Aula adicionada com sucesso!');
        this.getTrainingLessons();
      },
      error: (erro)=>{console.log('request to add lesson failed: ',erro);}
    })
  }

  private updateLesson(lesson: Lesson, trainingId: number){

    this.lessonApiService.updateLesson('trainings', trainingId, lesson).subscribe({
      next: ()=>{
        this.openSnackBar('Aula atualizada com sucesso!');
        this.getTrainingLessons();
      },
      error: (erro)=>{console.log('request to update lesson failed: ',erro);}
    })
  }

  private openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      horizontalPosition: snackBarConfig.horizontalPosition,
      verticalPosition: snackBarConfig.verticalPosition,
      duration: snackBarConfig.durationInSeconds * 1000
    });
  }


}
