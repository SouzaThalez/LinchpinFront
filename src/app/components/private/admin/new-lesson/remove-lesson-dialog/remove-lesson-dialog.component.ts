import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmRemoveComponent } from '../confirm-remove/confirm-remove.component';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { Training } from '../../../../../models/training';
import { LessonApiService, LessonGroupKind } from '../../../../../service/lesson-api.service';

@Component({
  selector: 'app-remove-lesson-dialog',
  templateUrl: './remove-lesson-dialog.component.html',
  styleUrl: './remove-lesson-dialog.component.scss'
})
export class RemoveLessonDialogComponent implements OnInit {

  disciplines: Training[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<RemoveLessonDialogComponent>,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private lessonApiService: LessonApiService,
    @Inject(MAT_DIALOG_DATA) public data: {
      dataName: string; // 'Treinamentos' ou 'Disciplinas'
    },
  ) { }

  //Mesmo dialog para remover Treinamentos e Disciplinas
  private get kind(): LessonGroupKind {
    return this.data.dataName == 'Treinamentos' ? 'trainings' : 'disciplines';
  }

  private get label(): string {
    return this.kind == 'trainings' ? 'Treinamento' : 'Disciplina';
  }

  ngOnInit(): void {
    this.getGroups();
  }


  onClose(){
    this.dialogRef.close(false);
  }


  openConfirmRemoveDialog(group: Training, index: number) {


    let dialogRef = this.matDialog.open(ConfirmRemoveComponent, {
      disableClose: true,
      width: '468px',
      data: {
        lessonData: group,
      }

    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeGroup(group);
      }
    })

  }

  private removeGroup(group: Training) {

    this.lessonApiService.removeGroup(this.kind, group.id).subscribe({
      next: () => {
        this.getGroups();
        this.openSnackBar(`${this.label} removido(a) com sucesso!`);
      },
      error: () => this.openSnackBar(`ERRO em REMOVER o(a) ${this.label}!`)
    })
  }

  private getGroups() {

    this.isLoading = true;

    this.lessonApiService.listGroups(this.kind).subscribe({
      next: (groups) => {
        this.disciplines = groups;
        this.isLoading = false;
      },
      error: (erro) => {
        this.isLoading = false;
        console.log('request to lesson groups failed: ', erro);
      }
    })
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: snackBarConfig.horizontalPosition,
      verticalPosition: snackBarConfig.verticalPosition,
      duration: snackBarConfig.durationInSeconds * 1000,
    });
  }

}
