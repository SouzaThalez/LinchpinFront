import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-class-simulator-dialog',
  templateUrl: './new-class-simulator-dialog.component.html',
  styleUrl: './new-class-simulator-dialog.component.scss'
})
export class NewClassSimulatorDialogComponent implements OnInit{

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<NewClassSimulatorDialogComponent>,
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
    //defaul image
    this.form.patchValue({
      classImage: 'assets/images/default-image.jpg',
    })

    this.dialogRef.close(this.form.value);

  }
  
  private createForm(){

    const form = this.fb.group({
      simulatorClass:[null,Validators.required],
      classImage:[null],
      simulators:this.fb.array([
        
      ]),
    
    })

    return form;
    
  }


}
