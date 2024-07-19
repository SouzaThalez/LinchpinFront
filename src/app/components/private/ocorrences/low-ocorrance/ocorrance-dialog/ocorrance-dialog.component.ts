import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { simulators } from '../../../../../data/simulators';

@Component({
  selector: 'app-ocorrance-dialog',
  templateUrl: './ocorrance-dialog.component.html',
  styleUrl: './ocorrance-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class OcorranceDialogComponent implements OnInit{

  
  checked = false;
  textMsg = 'mensagwem';
  isLinear = false;

  mediumSimulators =  simulators.mediumFidelity;
  simulatorCodes: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<OcorranceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb : FormBuilder,
  ){}
  
  ngOnInit(): void {

  } 

  
  onClose(value: string): void {
    this.dialogRef.close(value);
  }


  checkBox(value: any){
  }



  getSimulator(simulator: any) {
    this.simulatorCodes = simulator.codes;
    console.log('Selected Simulator:', simulator);
    // You can perform any other actions here based on the selected value
  }
  getCode(code:any){
    
  }


}
