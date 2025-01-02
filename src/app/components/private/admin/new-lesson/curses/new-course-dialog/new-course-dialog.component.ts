import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../../data/snackBarData';
import { Curse } from '../../../../../../models/curse';

@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './new-course-dialog.component.html',
  styleUrl: './new-course-dialog.component.scss'
})
export class NewCourseDialogComponent implements OnInit{
  
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewCourseDialogComponent>,
    private snackBar:MatSnackBar,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      courseData:any
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
 
    let model = this.form.value;
    this.dialogRef.close(model);

  }

  generateRandomId(): string {
    const min = 1000; // The minimum value (inclusive)
    const max = 9999; // The maximum value (inclusive
    return (Math.floor(Math.random() * (max - min + 1)) + min ).toString(); // Convert to string - user id 
  }

  private createForm(){

      const form = this.fb.group({
        name:[null,Validators.required],
        label:[null,Validators.required],
        lessonType:['curso'],
        id:[this.generateRandomId()]
      })

      return form;
      
  }


}
