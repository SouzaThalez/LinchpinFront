import { Component, Inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ocorranceData } from '../../../../../data/ocorranceData';
import moment from 'moment';

@Component({
  selector: 'app-new-lesson-dialog',
  templateUrl: './new-lesson-dialog.component.html',
  styleUrl: './new-lesson-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class NewLessonDialogComponent implements OnInit{

  form: FormGroup;
  cardType = ocorranceData.trainingTypes;
  trainingValue =  0; 
 

  constructor(
    public dialogRef: MatDialogRef<NewLessonDialogComponent>,
    private snackBar:MatSnackBar,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      trainingData:any
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
    
    let lesson = this.form.value;
    let momentDate = moment(lesson.updateDate).format('DD-MM-YYYY');
    lesson.updateDate = momentDate;

    let lessonsArray = this.data.trainingData[lesson.id - 1].lessons;
    lessonsArray.push(lesson);

    let model = this.data.trainingData[lesson.id - 1];
   
    this.dialogRef.close(model);

  }

  private createForm(){

    const form = this.fb.group({
      name:[null,Validators.required],
      updateDate:[null,Validators.required],
      description: [null,Validators.required],
      id:[null,Validators.required]
    
    })

    return form;
    
  }



}
