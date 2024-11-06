import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonDialogComponent } from '../edit-lesson-dialog/edit-lesson-dialog.component';
import { NewLessonDialogComponent } from '../new-lesson-dialog/new-lesson-dialog.component';
import { NewDisciplineDialogComponent } from './new-discipline-dialog/new-discipline-dialog.component';
import { RemoveLessonDialogComponent } from '../remove-lesson-dialog/remove-lesson-dialog.component';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.scss'
})
export class DisciplinesComponent implements OnInit{

  disciplines: any;
  trainingValue = 0;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ){}

  
  ngOnInit(): void {
      this.getDisciplineLessons();
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
      }
    })


  }
  
  openNewDisciplineDialog(){

    let dialogRef = this.matDialog.open(NewDisciplineDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{}
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
        this.postDisciplineLessons(model);
 

      }
    })
  }

  openRemoveLessonDialog(){

    let dialogRef = this.matDialog.open(RemoveLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        lessonData: this.disciplines,
         dataName:'Disciplinas'
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
      
 

      }
    })

  }


  openNewLessonDialog(){

    let dialogRef = this.matDialog.open(NewLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        trainingData: this.disciplines
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
        this.updateDisciplineLessons(model);
      } 
    })

  }


  private getDisciplineLessons(){

    this.httpClient.get('http://localhost:3000/Disciplines').subscribe({
      next:(sample:any)=>{
        this.disciplines = sample;
      },
      error: (erro)=>{console.log('request to Disciplines  failed: ',erro);}
    })

  }

  private postDisciplineLessons(model:any){

    this.httpClient.post('http://localhost:3000/Disciplines',model)
      .subscribe({
          next: (sample: any)=>{

            this.snackBar.open('Nova disciplina adicionada com sucesso!', 'Close', {
              horizontalPosition: snackBarConfig.horizontalPosition,
              verticalPosition: snackBarConfig.verticalPosition,
              duration: snackBarConfig.durationInSeconds * 1000 
            });

            this.getDisciplineLessons();
          },
          error: (erro)=>{console.log('request to Disciplines  failed: ',erro);}
      })
  }

  private updateDisciplineLessons(model:any){
    
      this.httpClient.put('http://localhost:3000/Disciplines/' + model.id, model)
      .subscribe({
          next: (sample: any)=>{
            this.ngOnInit();
          },
          error: (erro)=>{console.log('request Disciplines  is NOT good: ',erro);}
      })
  }

  
}
