import { Component, Inject, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';
import { NewTrainingDialogComponent } from './new-training-dialog/new-training-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewLessonDialogComponent } from '../new-lesson-dialog/new-lesson-dialog.component';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent implements OnInit{

  cardType = ocorranceData.trainingTypes;
  trainingValue:0;

  constructor(
    private matDialog: MatDialog,
  ){}


  ngOnInit(): void {
    console.log(this.cardType);
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
