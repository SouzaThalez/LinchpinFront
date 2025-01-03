import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curse } from '../../../../../../models/curse';
import moment from 'moment';
import { snackBarConfig } from '../../../../../../data/snackBarData';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EditCourseDialogComponent implements OnInit{
  
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      curse: Curse,
      documentId: string
    },
    ){}


  ngOnInit(): void {
    this.form = this.createForm();

    moment.locale('pt-br'); // Change date!
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
