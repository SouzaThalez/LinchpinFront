import { Component, Inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../models/simulator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import moment from 'moment';
import { CleaningReport, CleaningReportForm } from '../../../../../models/cleaningReport';

import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-low-fidelity-cleaning-dialog',
  templateUrl: './low-fidelity-cleaning-dialog.component.html',
  styleUrl: './low-fidelity-cleaning-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class LowFidelityCleaningDialogComponent implements OnInit{

  form: FormGroup;
  checked = false;
  textMsg = 'Não houve achados durante a limpeza deste simulador';
  snackbarMessage = 'Registro salvo com sucesso!';
  simulatorCodes: Array<any> = [];
  openTicketMsg = 'Já existe um chamado aberto para este simulador. Feche o chamado antes de registrar um novo achado.';
  openTicketCodes = new Set<string>();
  hasOpenTicket = false;

  constructor(
    public dialogRef: MatDialogRef<LowFidelityCleaningDialogComponent>,
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
      this.getOpenTickets();

      this.form.get('simulatorCode')?.valueChanges.subscribe(() => this.checkOpenTicket());
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

    // com chamado aberto só é possível registrar limpeza sem achados ("Nenhum")
    if (this.hasOpenTicket && !this.checked) {
      this.openSnackBar(this.openTicketMsg);
      return
    }

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

  private checkOpenTicket(){
    const code: string | null = this.form.get('simulatorCode')?.value;
    this.hasOpenTicket = !!code && this.openTicketCodes.has(code.trim().toUpperCase());
  }

  private getOpenTickets(){
    // chamados de limpeza abertos (com achados e ainda não fechados) deste simulador
    let params = new HttpParams()
      .set('simulatorId', this.data.simulator.id)
      .set('open', 'true');

    this.httpClient.get<CleaningReport[]>(environment.apiUrl + '/cleaning-reports', { params })
    .subscribe({
        next: (reports)=>{
          this.openTicketCodes = new Set(reports.map(r => r.simulatorCode.toUpperCase()));
          this.checkOpenTicket();
        },
        error: (erro)=>{console.log('request to open cleaning-reports is NOT good: ',erro);}
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
