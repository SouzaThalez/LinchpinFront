import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lesson } from '../../../../../models/lesson';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { simulators } from '../../../../../data/simulators';
import { Simulator } from '../../../../../models/simulator';
import { provideNativeDateAdapter } from '@angular/material/core';

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
  ){}
  
  ngOnInit(): void {
    
    this.data.curse
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
