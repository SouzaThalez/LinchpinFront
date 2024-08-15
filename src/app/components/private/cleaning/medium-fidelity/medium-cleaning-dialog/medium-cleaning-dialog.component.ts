import { Component, Inject, OnInit } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../models/simulator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';


@Component({
  selector: 'app-medium-cleaning-dialog',
  templateUrl: './medium-cleaning-dialog.component.html',
  styleUrl: './medium-cleaning-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class MediumCleaningDialogComponent implements OnInit{

  form: FormGroup;
  checked = false;
  textMsg = 'Não houve achados durante a limpeza deste simulador';
  snackbarMessage = 'Registro salvo com sucesso!';
  simulatorCodes: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<MediumCleaningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: Simulator
    },
    public fb : FormBuilder,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {

    this.form = this.createForm();
    this.simulatorCodes = this.data.simulator.codes;
  }

  onClose(value: any): void {
    this.dialogRef.close(value);
    this.openSnackBar(this.snackbarMessage);
  }

  checkBox(value: any){
    this.checked = value;
    if(this.checked){
      this.form.patchValue({
        findings:this.textMsg,
        hasDescription:false,
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

  private postCleaningReports(model:any){

   this.httpClient.post('http://localhost:3000/CleaningReports',model)
   .subscribe({
       next: (sample: any)=>{
         console.log('request to prepared class  ok!: ',sample);
       },
       error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
   })
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

  private createForm(): FormGroup{

    const prevForm = this.fb.group({

      date: [null,Validators.required],
      cleaningCategory:[null,Validators.required],
      simulatorCategory:['media'],
      simulatorName:[this.data.simulator.name],
      simulatorCode:[null,Validators.required],
      findings:[null,Validators.required],
      hasDescription:[true],
      simulatorImage:[this.data.simulator.image],
      user: [],
    })

    return prevForm;
  }

}
