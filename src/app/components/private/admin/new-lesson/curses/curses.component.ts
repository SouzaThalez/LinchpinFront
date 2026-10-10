import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCourseDialogComponent } from './new-course-dialog/new-course-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { Curse } from '../../../../../models/curse';
import moment from 'moment';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { LessonApiService } from '../../../../../service/lesson-api.service';

@Component({
  selector: 'app-curses',
  templateUrl: './curses.component.html',
  styleUrl: './curses.component.scss'
})
export class CursesComponent implements OnInit{


  courses: Curse[] = [];
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private lessonApiService: LessonApiService
  ){}


  ngOnInit(): void {
    this.getCourses();
  }

  openEditCourseDialog(curse: Curse){

    let dialogRef = this.matDialog.open(EditCourseDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        curse: curse
      }

    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){

        let model = result;
        let convertedDate = moment(model.updateDate).format('DD-MM-YYYY');
        model.updateDate = convertedDate;

        this.updateCourse(model, curse.id);


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
        this.createCourse(result);
      }
    })
  }

  private updateCourse(model: any, id: number) {

    this.lessonApiService.updateCourse(id, model).subscribe({
      next: () => {
        this.openSnackBar('Curso atualizado com sucesso!');
        this.getCourses();
      },
      error: () => this.openSnackBar('ERRO em atualização do curso!')
    })
  }

  private createCourse(model: any) {

    this.lessonApiService.createCourse(model).subscribe({
      next: () => {
        this.openSnackBar('Curso adicionado com sucesso!');
        this.getCourses();
      },
      error: (erro) => console.error("Error writing course: ", erro)
    })
  }

  private getCourses() {

    this.isLoading = true;

    this.lessonApiService.listCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.isLoading = false;
      },
      error: (erro) => {
        this.isLoading = false;
        console.log('request to Courses failed: ', erro);
      }
    })
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: snackBarConfig.horizontalPosition,
      verticalPosition: snackBarConfig.verticalPosition,
      duration: snackBarConfig.durationInSeconds * 1000
    });
  }


}
