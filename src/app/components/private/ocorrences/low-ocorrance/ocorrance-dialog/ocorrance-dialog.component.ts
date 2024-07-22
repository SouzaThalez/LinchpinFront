import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { simulators } from '../../../../../data/simulators';
import { Lesson } from '../../../../../models/lesson';
import { Simulator } from '../../../../../models/simulator';

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


  defaultMessage = 'Não houve registro de ocorrência de aula';
  defaultSimulatorMessage = 'Não houve ocorrência de Simulador';

  selectedSimulator: Simulator;

  mediumSimulators =  simulators.mediumFidelity;
  simulatorCodes: Array<any> = [];

  form:FormGroup = this.createForm();





  constructor(
    public dialogRef: MatDialogRef<OcorranceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      lesson: Lesson
    },
    private fb : FormBuilder,
  ){}
  
  ngOnInit(): void {

    console.log(this.data.lesson);
    this.form = this.createForm();
  } 

  
  onClose(value: string): void {
    this.dialogRef.close(value);
  }


  checkBox(value: any){
    this.checked = value;
    this.form.patchValue({ocorrance: this.defaultMessage})
  }
  checkSimBox(value: any){
    this.isValid = value;
  }



  getSimulator(simulator: any) {
   
    this.selectedSimulator = simulator;
    this.simulatorCodes = simulator.codes;
    this.form.patchValue({code:null})
    console.log('Selected Simulator:', simulator);
    
  }


  getCode(code:any){
    
  }


  submitForm(){
 
    if(this.form.invalid){

    }
  }


  private createForm(): FormGroup {
  
    const form = this.fb.group({
      
      name: [null, Validators.required],
      simulator: [null, Validators.required],
      code:[null, Validators.required],
      ocorrance: [null, Validators.required],
      date: [null, Validators.required],
      user:[null],
    });

    return form;

  }











}
