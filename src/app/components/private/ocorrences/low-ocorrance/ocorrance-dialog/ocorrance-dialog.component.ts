import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Lesson } from '../../../../../models/lesson';
import { Simulator } from '../../../../../models/simulator';
import moment from 'moment';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { HttpClient } from '@angular/common/http';
import { LessonReport, LessonReportCategory, LessonReportForm } from '../../../../../models/lessonReport';

import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-ocorrance-dialog',
  templateUrl: './ocorrance-dialog.component.html',
  styleUrl: './ocorrance-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class OcorranceDialogComponent implements OnInit{

  //Checkboxes "Nenhuma"/"Nenhum"
  noLessonOccurrence = false;
  noSimulatorOccurrence = false;
  defaultLessonMessage = 'Não houve registro de ocorrência de aula';
  defaultSimulatorMessage = 'Não houve ocorrência de Simulador';
  snackbarMessage = 'Registro salvo com sucesso!';

  selectedSimulator: Simulator;
  mediumSimulators: Simulator[];
  simulatorCodes: Array<any> = [];

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OcorranceDialogComponent>,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {
      selectedLesson: Lesson,
      training: any,
      category: LessonReportCategory
    },
    private fb : FormBuilder,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.form = this.createForm();
    this.getMediumSimulators();
  }

  onClose(value: LessonReport): void {
    this.dialogRef.close(value);
    this.openSnackBar(this.snackbarMessage);
  }

  checkLessonBox(value: boolean){
    this.noLessonOccurrence = value;
    this.form.patchValue({ hasLessonOccurrence: !value });
    this.setRequired(['lessonOccurrence'], !value);
  }

  checkSimulatorBox(value: boolean){
    this.noSimulatorOccurrence = value;
    this.form.patchValue({ hasSimulatorOccurrence: !value });
    this.setRequired(['simulatorId', 'simulatorCode', 'simulatorOccurrence'], !value);
  }

  getSimulator(simulator: Simulator) {
    this.selectedSimulator = simulator;
    this.simulatorCodes = simulator.codes;
    this.form.patchValue({ simulatorCode: null });
  }

  submitForm(){

    if (this.form.valid) {

      const value = this.form.value;
      const model: LessonReportForm = {
        ...value,
        date: moment(value.date).format('DD-MM-YYYY'),
        lessonOccurrence: value.hasLessonOccurrence ? value.lessonOccurrence : null,
        simulatorId: value.hasSimulatorOccurrence ? value.simulatorId : null,
        simulatorCode: value.hasSimulatorOccurrence ? value.simulatorCode : null,
        simulatorOccurrence: value.hasSimulatorOccurrence ? value.simulatorOccurrence : null,
      };

      this.postLessonReport(model);
      return
    }

    this.openAlertDialog();
  }

  private setRequired(controls: string[], required: boolean){
    for (const name of controls) {
      const control = this.form.get(name)!;
      control.setValidators(required ? Validators.required : null);
      control.updateValueAndValidity();
    }
  }

  private openSnackBar(message: string): void {

    this.snackBar.open(message, 'Close', {
      horizontalPosition: snackBarConfig.horizontalPosition,
      verticalPosition: snackBarConfig.verticalPosition,
      duration: snackBarConfig.durationInSeconds * 1000
    });

  }

  private openAlertDialog(){

    this.matDialog.open(AlertDialogComponent,{
      disableClose: true,
      width:'468px',
    })
  }

  private postLessonReport(model: LessonReportForm){

    this.httpClient.post<LessonReport>(environment.apiUrl + '/lesson-reports', model)
    .subscribe({
        next: (report)=>{
          this.onClose(report);
        },
        error: (erro)=>{
          console.log('request to lesson-reports is NOT good: ',erro);
          this.openSnackBar(erro.error?.title ?? 'Não foi possível salvar o registro.');
        }
    })
  }

  private createForm(): FormGroup{

    const prevForm = this.fb.group({
      category: [this.data.category],
      lessonId: [this.data.selectedLesson.id],
      date: [null, Validators.required],
      hasLessonOccurrence: [true],
      lessonOccurrence: [null, Validators.required],
      hasSimulatorOccurrence: [true],
      simulatorId: [null, Validators.required],
      simulatorCode: [null, Validators.required],
      simulatorOccurrence: [null, Validators.required],
    })

    return prevForm;
  }

  private getMediumSimulators(){

    this.httpClient.get<Simulator[]>(environment.apiUrl + '/simulators?category=media').subscribe({
      next:(sample)=>{
        this.mediumSimulators = sample;
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }


}
