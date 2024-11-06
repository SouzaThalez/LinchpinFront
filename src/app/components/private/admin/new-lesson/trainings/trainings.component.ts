import { Component, Inject, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';
import { NewTrainingDialogComponent } from './new-training-dialog/new-training-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NewLessonDialogComponent } from '../new-lesson-dialog/new-lesson-dialog.component';
import { EditLessonDialogComponent } from '../edit-lesson-dialog/edit-lesson-dialog.component';
import { HttpClient } from '@angular/common/http';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemoveLessonDialogComponent } from '../remove-lesson-dialog/remove-lesson-dialog.component';
import moment from 'moment';

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
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
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
        
        let model = result;
        this.postTrainingLesson(model);
 

      }
    })
  }

  openNewLessonDialog(){

    let dialogRef = this.matDialog.open(NewLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        trainingData: this.trainingLessons
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
       this.updateTrainingLesson(model);
       
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
        debugger
        let model = result;
        const convertedDate = moment(model.updateDate).format('DD-MM-YYYY');
        model.updateDate = convertedDate;
        console.log(model)
        
      }
    })


  }



  openRemoveLessonDialog(){
    
    let dialogRef = this.matDialog.open(RemoveLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        lessonData: this.trainingLessons,
        dataName:'Treinamentos'
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
      
 

      }
    })
  }



  private getTrainingLessons(){

    this.httpClient.get('http://localhost:3000/Trainings').subscribe({
      next:(sample:any)=>{
        this.trainingLessons = sample;
      },
      error: (erro)=>{console.log('request to Trainings  failed: ',erro);}
    })

  }
  
  private postTrainingLesson(model:any){

  this.httpClient.post('http://localhost:3000/Trainings',model)
    .subscribe({
        next: (sample: any)=>{

          this.snackBar.open('Nova Treinamento adicionado com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });

          this.getTrainingLessons();
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private updateTrainingLesson(model:any){

    this.httpClient.put('http://localhost:3000/Trainings/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{

          this.snackBar.open('Aula adicionada com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });

          this.ngOnInit();
        },
        error: (erro)=>{console.log('request Users  is NOT good: ',erro);}
    })
  }


}
