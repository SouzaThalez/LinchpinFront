import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ocorranceData } from '../../../../../data/ocorranceData';
import { EditLessonDialogComponent } from '../edit-lesson-dialog/edit-lesson-dialog.component';
import { NewTrainingDialogComponent } from '../trainings/new-training-dialog/new-training-dialog.component';
import { NewLessonDialogComponent } from '../new-lesson-dialog/new-lesson-dialog.component';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.scss'
})
export class DisciplinesComponent implements OnInit{

  disciplines = ocorranceData.disciplineTypes;
  trainingValue = 0;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}

  
  ngOnInit(): void {
    
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


}
