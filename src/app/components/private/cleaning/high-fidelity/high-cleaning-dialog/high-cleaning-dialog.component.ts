import { Component, Inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../models/simulator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import moment from 'moment';
import { CleaningReport, CleaningReportForm } from '../../../../../models/cleaningReport';

import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-high-cleaning-dialog',
  templateUrl: './high-cleaning-dialog.component.html',
  styleUrl: './high-cleaning-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class HighCleaningDialogComponent implements OnInit{

  form: FormGroup;
  checked = false;
  textMsg = 'Não houve achados durante a limpeza deste simulador';
  snackbarMessage = 'Registro salvo com sucesso!';
  simulatorCodes: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<HighCleaningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: Simulator
    },
    private fb : FormBuilder,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
      this.form = this.createForm();
      this.simulatorCodes = this.data.simulator.codes;
  }

  onClose(value: any): void {
    this.dialogRef.close(value); // passing the dataValue to dialog
    this.openSnackBar(this.snackbarMessage);
  }

  checkBox(value: any){
    this.checked = value;
    this.form.patchValue({
      findings: this.checked ? this.textMsg : null,
      hasDescription: !this.checked,
    })
  }

  onSubmit(): void {

    if (this.form.valid) {

      const model: CleaningReportForm = {
        ...this.form.value,
        date: moment(this.form.value.date).format('DD-MM-YYYY')
      };

      this.postCleaningReport(model);
      return
    }

    this.openAlertDialog();

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

  private postCleaningReport(model: CleaningReportForm){

    this.httpClient.post<CleaningReport>(environment.apiUrl + '/cleaning-reports', model)
    .subscribe({
        next: (report)=>{
          this.onClose(report);
        },
        error: (erro)=>{
          console.log('request to cleaning-reports is NOT good: ',erro);
          this.openSnackBar(erro.error?.title ?? 'Não foi possível salvar o registro.');
        }
    })
  }

  private createForm(): FormGroup{

    const prevForm = this.fb.group({
      simulatorId: [this.data.simulator.id],
      simulatorCode: [null, Validators.required],
      cleaningCategory: [null, Validators.required],
      date: [null, Validators.required],
      findings: [null, Validators.required],
      hasDescription: [true],
    })

    return prevForm;
  }

}
