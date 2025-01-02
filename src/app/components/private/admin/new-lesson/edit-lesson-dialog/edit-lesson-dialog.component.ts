import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { provideNativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { Curse } from '../../../../../models/curse';

@Component({
  selector: 'app-edit-lesson-dialog',
  templateUrl: './edit-lesson-dialog.component.html',
  styleUrl: './edit-lesson-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EditLessonDialogComponent implements OnInit{

  form: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<EditLessonDialogComponent>,
    private snackBar:MatSnackBar,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      curse: Curse,
      documentId: string
    },
  ){}

  ngOnInit(): void {

    this.form = this.createForm();
    moment.locale('pt-br');
    
    //Mudar a data !
    const updateDate = moment(this.data.curse.updateDate).toDate();

    this.form.patchValue({
      name: this.data.curse.name,
      updateDate:updateDate,
      description: this.data.curse.description,
    });
   
    
  


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
      updateDate: [null, Validators.required],
      description: [null,Validators.required],
    
    })

    return form;
    
  }

}
