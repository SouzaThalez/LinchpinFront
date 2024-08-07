import { Component, Inject, OnInit } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../models/simulator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  simulatorCodes: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<MediumCleaningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: Simulator
    },
    public fb : FormBuilder,
  ){}

  ngOnInit(): void {

    this.form = this.createForm();
    this.simulatorCodes = this.data.simulator.codes;
  }

  onClose(value: string): void {
    this.dialogRef.close(value);
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
      console.log(this.form.value);
    }
  }

  private createForm(): FormGroup{

    const prevForm = this.fb.group({

      date: [null,Validators.required],
      cleaningCategory:[null,Validators.required],
      simulatorName:[this.data.simulator.name],
      simulatorCode:[null,Validators.required],
      findings:[],
      user: [],
    })

    return prevForm;
  }


}
