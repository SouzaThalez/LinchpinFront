import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../../data/snackBarData';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-new-training-dialog',
  templateUrl: './new-training-dialog.component.html',
  styleUrl: './new-training-dialog.component.scss',
})
export class NewTrainingDialogComponent implements OnInit{

  
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewTrainingDialogComponent>,
    private matDialog: MatDialog,
    private snackBar:MatSnackBar,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorCategory: string
    },
  ){}
  ngOnInit(): void {
    this.form = this.createForm();
  }

  onInputChange(value: string) {
    // Strip non-numeric characters
    const numberValue = parseInt(value, 10);

    // Ensure the number is between 1 and 99
    if (numberValue < 1 || numberValue > 99 || isNaN(numberValue)) {
      this.form.get('value').setErrors({ rangeError: true });
    } else {
      this.form.get('value').setErrors(null); // Reset error if valid
    }
  }

  submitForm(){
    debugger
    if(this.form.invalid){

      this.snackBar.open('Favor preencher todos os Campos!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      return
    }

    this.dialogRef.close(this.form.value);

  }

  private createForm(){

    const form = this.fb.group({
      name:['Treinamento Habilidade'],
      value: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      lessons:this.fb.array([]),
    })

    return form;
    
  }

}
