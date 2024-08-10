import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { simulators } from '../../../../../data/simulators';
import { Lesson } from '../../../../../models/lesson';
import { Simulator } from '../../../../../models/simulator';
import moment from 'moment';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-ocorrance-dialog',
  templateUrl: './ocorrance-dialog.component.html',
  styleUrl: './ocorrance-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class OcorranceDialogComponent implements OnInit{

  //Checkboxes
  checked = false;
  isValid = false;


  defaultLessonMessage = 'Não houve registro de ocorrência de aula';
  defaultSimulatorMessage = 'Não houve ocorrência de Simulador';

  selectedSimulator: Simulator;

  mediumSimulators =  simulators.mediumFidelity;
  simulatorCodes: Array<any> = [];

  form:FormGroup = this.createForm();





  constructor(
    public dialogRef: MatDialogRef<OcorranceDialogComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      lesson: Lesson,
      lessonType: any
    },
    private fb : FormBuilder,
  ){}
  
  ngOnInit(): void {
    this.form = this.createForm();
  } 

  
  onClose(value: string): void {
    this.dialogRef.close(value);
  }


  checkBox(value: any){
    this.checked = value;
    this.form.patchValue({
      lessonOcorrance: this.defaultLessonMessage,
    })
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

    this.form.patchValue({
      simulatorName: simulator.name
    })
    
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
      this.onClose(model);
      
      return
    }
    console.log(this.form.value);
    this.openAlertDialog();



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
      name:[this.data.lesson.name],
      lessonOcorrance:[],
      simulatorOcorrance:[null,Validators.required],
      simulatorName:[null,Validators.required],
      simulatorCode:[null,Validators.required],
      lessonType: [this.data.lessonType.name + ' ' + this.data.lessonType.value],
      user: [],
    })

    return prevForm;
  }



}
