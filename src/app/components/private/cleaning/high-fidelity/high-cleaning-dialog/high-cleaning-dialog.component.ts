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

  
  onClose(value: string): void {
    this.dialogRef.close(value);
    this.openSnackBar(this.snackbarMessage);
  }
 
  checkBox(value: any){
    this.checked = value;
    if(this.checked){
      this.form.patchValue({
        findings:this.textMsg
      })
    }
  } 

  onSubmit(): void {
    
    if (this.form.valid) {

      let momentDate = moment(this.form.value.date).format('DD-MM-YYYY');
      this.form.patchValue({date: momentDate});

      const model = this.form.value;
      this.postCleaningReports(model);
      this.onClose(model);

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

    let dialogRef = this.matDialog.open(AlertDialogComponent,{
      disableClose: true,
      width:'468px',
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

  private postCleaningReports(model:any){

    this.httpClient.post('http://localhost:3000/CleaningReports',model)
    .subscribe({
        next: (sample: any)=>{
          console.log('request to prepared class  ok!: ',sample);
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private createForm(): FormGroup{

    const prevForm = this.fb.group({

      date: [null,Validators.required],
      cleaningCategory:[null,Validators.required],
      simulatorCategory:['alta'],
      simulatorName:[this.data.simulator.name],
      simulatorCode:[null,Validators.required],
      findings:[null,Validators.required],
      user: [],
    })

    return prevForm;
  }

}
