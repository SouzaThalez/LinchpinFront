import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonDialogComponent } from '../edit-lesson-dialog/edit-lesson-dialog.component';
import { NewCourseDialogComponent } from './new-course-dialog/new-course-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';

@Component({
  selector: 'app-curses',
  templateUrl: './curses.component.html',
  styleUrl: './curses.component.scss'
})
export class CursesComponent implements OnInit{
  

  courses: any;
  trainingValue = 0;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ){}

  
  ngOnInit(): void {
    this.getCurses();
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
  
  
  openNewCourseDialog(){

    let dialogRef = this.matDialog.open(NewCourseDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{}
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
        let model = result;
        this.postCourse(model);

      }
    })
  }


  private getCurses(){

    this.httpClient.get('http://localhost:3000/Curses').subscribe({
      next:(sample:any)=>{
        this.courses = sample;
        console.log(this.courses)
      },
      error: (erro)=>{console.log('request to Disciplines  failed: ',erro);}
    })

  }

  private postCourse(model:any){

    this.httpClient.post('http://localhost:3000/Curses',model)
      .subscribe({
          next: (sample: any)=>{

            this.snackBar.open('Curso adicionado com sucesso!', 'Close', {
              horizontalPosition: snackBarConfig.horizontalPosition,
              verticalPosition: snackBarConfig.verticalPosition,
              duration: snackBarConfig.durationInSeconds * 1000 
            });
            this.getCurses();
          },
          error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
      })
    }


}
