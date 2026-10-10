import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonDialogComponent } from './edit-lesson-dialog/edit-lesson-dialog.component';
import { NewLessonDialogComponent } from '../new-lesson-dialog/new-lesson-dialog.component';
import { NewDisciplineDialogComponent } from './new-discipline-dialog/new-discipline-dialog.component';
import { RemoveLessonDialogComponent } from '../remove-lesson-dialog/remove-lesson-dialog.component';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { Training } from '../../../../../models/training';
import { Lesson } from '../../../../../models/lesson';
import { LessonApiService } from '../../../../../service/lesson-api.service';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.scss'
})
export class DisciplinesComponent implements OnInit {

  disciplines: Training[] = [];
  isLoading = false;
  trainingValue = 0;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private lessonApiService: LessonApiService
  ) { }


  ngOnInit(): void {
   this.getDisciplines();
  }


  openNewDisciplineDialog() {

    let dialogRef = this.matDialog.open(NewDisciplineDialogComponent, {
      disableClose: true,
      width: '468px',
      data: {}

    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createDiscipline(result);
      }
    })
  }
  openNewLessonDialog() {

    let dialogRef = this.matDialog.open(NewLessonDialogComponent, {
      disableClose: true,
      width: '468px',
      data: {
        trainingData: this.disciplines,
        dialogType:'Disciplina'
      }

    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addLesson(result.lesson, result.groupId);
      }
    })

  }
  openEditLessonDialog(lesson: Lesson, disciplineId: number) {


    let dialogRef = this.matDialog.open(EditLessonDialogComponent, {
      disableClose: true,
      width: '468px',
      data:{
        lesson: lesson
      }


    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let model = result;
        const convertedDate = moment(model.updateDate).format('DD-MM-YYYY');
        model.updateDate = convertedDate;

        this.updateLesson(model, disciplineId);
      }
    })


  }
  openRemoveLessonDialog() {

    let dialogRef = this.matDialog.open(RemoveLessonDialogComponent, {
      disableClose: true,
      width: '468px',
      data: {
        dataName: 'Disciplinas'
      }

    })

    dialogRef.afterClosed().subscribe(result => {
      if(result ==  false){
        this.trainingValue = 0;
        this.getDisciplines();
      }
    })

  }


  private createDiscipline(model: any) {

    this.lessonApiService.createGroup('disciplines', model).subscribe({
      next: () => {
        this.openSnackBar('Disciplina adicionada com sucesso!');
        this.getDisciplines();
      },
      error: (erro) => this.openSnackBar(erro.error?.title ?? 'ERRO ao adicionar a disciplina!')
    })
  }

  private getDisciplines() {

    this.isLoading = true;

    this.lessonApiService.listGroups('disciplines').subscribe({
      next: (disciplines) => {
        this.disciplines = disciplines;
        this.isLoading = false;
      },
      error: (erro) => {
        this.isLoading = false;
        console.log('request to Disciplines failed: ', erro);
      }
    })
  }

  private addLesson(lesson: any, disciplineId: number) {

    this.lessonApiService.addLesson('disciplines', disciplineId, lesson).subscribe({
      next: () => {
        this.openSnackBar('Aula adicionada com sucesso!');
        this.getDisciplines();
      },
      error: () => this.openSnackBar('ERRO em adicionar a aula!')
    })
  }

  private updateLesson(lesson: Lesson, disciplineId: number) {

    this.lessonApiService.updateLesson('disciplines', disciplineId, lesson).subscribe({
      next: () => {
        this.openSnackBar('Aula atualizada com sucesso!');
        this.getDisciplines();
      },
      error: () => this.openSnackBar('ERRO em atualizar a aula!')
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
