import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../../data/snackBarData';

@Component({
  selector: 'app-new-discipline-dialog',
  templateUrl: './new-discipline-dialog.component.html',
  styleUrl: './new-discipline-dialog.component.scss'
})
export class NewDisciplineDialogComponent implements OnInit{
  
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewDisciplineDialogComponent>,
    private snackBar:MatSnackBar,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {},
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
    
    let model = this.form.value;
    this.dialogRef.close(model);

  }

  private createForm(){

    const form = this.fb.group({
      name:[null,Validators.required],
      value:[null,Validators.required],
      lessons:this.fb.array([]),
      
    })

    return form;
    
  }

}
