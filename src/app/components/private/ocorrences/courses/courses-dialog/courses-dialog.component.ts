import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Lesson } from '../../../../../models/lesson';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { simulators } from '../../../../../data/simulators';
import { Simulator } from '../../../../../models/simulator';
import { provideNativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrl: './courses-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CoursesDialogComponent implements OnInit{

  //Checkboxes
  checked = false;
  isValid = false;


  defaultMessage = 'Não houve registro de ocorrência de aula';
  defaultSimulatorMessage = 'Não houve ocorrência de Simulador';
  snackbarMessage = 'Registro salvo com sucesso!';

  selectedSimulator: Simulator;

  mediumSimulators =  simulators.mediumFidelity;
  simulatorCodes: Array<any> = [];

  form:FormGroup = this.createForm();





  constructor(
    public dialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      curse: any
    },
    private fb : FormBuilder,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ){}
  
  ngOnInit(): void {
  
    this.form = this.createForm();

  } 

  
  onClose(value: string): void {
    this.dialogRef.close(value);
    this.openSnackBar(this.snackbarMessage);
  }


  checkBox(value: any){
    this.checked = value;
    this.form.patchValue({ocorrance: this.defaultMessage})
  }

  checkSimBox(value: any){
    this.isValid = value;
    if(this.isValid){
      this.form.patchValue({
        simulatorOcorrance: this.defaultSimulatorMessage,
        simulatorName:'Não informado',
        simulatorCode:'Não informado'
      })
    }
   
  }



  getSimulator(simulator: any) {
   
    this.selectedSimulator = simulator;
    this.simulatorCodes = simulator.codes;
    this.form.patchValue({code:null})
    console.log('Selected Simulator:', simulator);
    
  }

  getCode(code:any){
   
    this.form.patchValue({
      simulatorCode: code
    })
  }



  submitForm(){
   
    if (this.form.valid) {

      let momentDate = moment(this.form.value.date).format('DD-MM-YYYY');
      this.form.patchValue({date: momentDate});
  
      const model = this.form.value;
      //send data to ocorrance Dialog
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

  private createForm(): FormGroup{

    const prevForm = this.fb.group({

      date: [null,Validators.required],
      name:[this.data.curse.name],
      lessonOcorrance:[],
      simulatorOcorrance:[null,Validators.required],
      simulatorName:[null,Validators.required],
      simulatorCode:[null,Validators.required],
      lessonCategory: [this.data.curse.type],
      lessonType:[this.data.curse.value],
      user: [],
    })

    return prevForm;
  }

}
