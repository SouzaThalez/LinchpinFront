import { Component, Inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-lesson-dialog',
  templateUrl: './new-lesson-dialog.component.html',
  styleUrl: './new-lesson-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class NewLessonDialogComponent implements OnInit{

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewLessonDialogComponent>,
    private matDialog: MatDialog,
    private snackBar:MatSnackBar,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      lessonData: string
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
      updateDate:[null,Validators.required],
      description: [null,Validators.required],
    
    })

    return form;
    
  }
}
