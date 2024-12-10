import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';


@Component({
  selector: 'app-add-new-user-dialog',
  templateUrl: './add-new-user-dialog.component.html',
  styleUrl: './add-new-user-dialog.component.scss'
})
export class AddNewUserDialogComponent implements OnInit{

  form:FormGroup;
 

  constructor(
    public dialogRef: MatDialogRef<AddNewUserDialogComponent>,
    private snackBar:MatSnackBar,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      role: string
      image: string
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

    if(this.form.value.password != this.form.value.confirmPassword){

      this.snackBar.open('As senhas devem ser iguais!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      return
    }

    this.dialogRef.close(this.form.value);
    debugger

  }



  private createForm(){

    const form = this.fb.group({
      name:[null,Validators.required],
      login:[null,Validators.required],
      password: [null,Validators.required],
      confirmPassword:[null],
      email:[null,Validators.required],
      image:[this.data.image],
      role:[this.data.role],
    })

    return form;
    
  }

}
