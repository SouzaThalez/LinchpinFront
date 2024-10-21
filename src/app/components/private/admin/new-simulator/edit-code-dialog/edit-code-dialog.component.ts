import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';

@Component({
  selector: 'app-edit-code-dialog',
  templateUrl: './edit-code-dialog.component.html',
  styleUrl: './edit-code-dialog.component.scss'
})
export class EditCodeDialogComponent implements OnInit{

  codeValue: string;
  editCodeForm: FormGroup;
  newCodeForm: FormGroup;

  invalidCodeMesg ='código invalido';

  constructor(
    public dialogRef: MatDialogRef<EditCodeDialogComponent>,
    private matDialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {
      selectedCode: string
      simulatorData: any
      isNewCodeDialog: boolean 
      isEditCodeDialog: boolean 
    },
  ){}


  ngOnInit(): void {
    
    this.editCodeForm = this.createEditForm();
    this.newCodeForm = this.createNewCodeForm();
    
  }


  submitCode(){
   
    //submit editCodeForm
    if(this.data.isEditCodeDialog){

      if (this.editCodeForm.invalid){
    
        this.snackBar.open(this.invalidCodeMesg, 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });
      }
    
      if (this.editCodeForm.valid) {
  
          let codeFound = this.data.simulatorData.codes.find((element) => element.code === this.editCodeForm.value.codeValue);
        
          if(codeFound != null){
            this.snackBar.open('Este código já existe!', 'Close', {
              horizontalPosition: snackBarConfig.horizontalPosition,
              verticalPosition: snackBarConfig.verticalPosition,
              duration: snackBarConfig.durationInSeconds * 1000 
            });
          }else{
  
            if(this.editCodeForm.value.codeValue == this.data.selectedCode){
              this.snackBar.open('Este código já existe!', 'Close', {
                horizontalPosition: snackBarConfig.horizontalPosition,
                verticalPosition: snackBarConfig.verticalPosition,
                duration: snackBarConfig.durationInSeconds * 1000 
              });
  
            }else{
              this.dialogRef.close(this.editCodeForm.value.codeValue);
              this.snackBar.open('CÓDIGO REGISTRADO!', 'Close', {
                horizontalPosition: snackBarConfig.horizontalPosition,
                verticalPosition: snackBarConfig.verticalPosition,
                duration: snackBarConfig.durationInSeconds * 1000 
              });
            }
  
          
          }
  
      } 

    } 

    //submit newCodeForm
    if(this.data.isNewCodeDialog){

      if (this.newCodeForm.invalid){
    
        this.snackBar.open(this.invalidCodeMesg, 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });
      }
    
      if (this.newCodeForm.valid) {
  
          let codeFound = this.data.simulatorData.codes.find((element) => element.code === this.newCodeForm.value.code);
        
          if(codeFound != null){
            this.snackBar.open('Este código já existe!', 'Close', {
              horizontalPosition: snackBarConfig.horizontalPosition,
              verticalPosition: snackBarConfig.verticalPosition,
              duration: snackBarConfig.durationInSeconds * 1000 
            });
          }else{
            this.dialogRef.close(this.newCodeForm.value.code);
          }
  
      } 

    } 
   

  }

  private codeValidator(control: any) {
    const value = control.value;
    const regex = /^[A-Z0-9]{6}$/; // Regex for 6 uppercase letters and numbers
    return regex.test(value) ? null : { invalidCode: true };
  }

  private createEditForm(): FormGroup{

    const form = this.fb.group({
      codeValue: [this.data.selectedCode, [Validators.required, this.codeValidator]]
    })

    return form;
  }

  private createNewCodeForm(): FormGroup{

    const form = this.fb.group({
      code: [null, [Validators.required, this.codeValidator]]
    })

    return form;
  }



}
