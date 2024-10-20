import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../../data/snackBarData';

@Component({
  selector: 'app-new-training-dialog',
  templateUrl: './new-training-dialog.component.html',
  styleUrl: './new-training-dialog.component.scss'
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


  submitForm(){
  
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
      name:[null,Validators.required],
      value:[null,Validators.required],
      description: [null,Validators.required],
      lessons:this.fb.array([]),
    
    })

    return form;
    
  }

}
