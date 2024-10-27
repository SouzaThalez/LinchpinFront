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

  disciplines: any;
  trainingValue = 0;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
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
        let model = result;
        this.postDisciplineLessons(model);
 

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
