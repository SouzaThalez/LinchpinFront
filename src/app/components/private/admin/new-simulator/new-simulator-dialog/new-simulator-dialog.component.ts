import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteCodeDialogComponent } from '../delete-code-dialog/delete-code-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-simulator-dialog',
  templateUrl: './new-simulator-dialog.component.html',
  styleUrl: './new-simulator-dialog.component.scss'
})
export class NewSimulatorDialogComponent implements OnInit{

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewSimulatorDialogComponent>,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
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
      image: 'assets/images/default-image.jpg',
      simulatorCategory: this.data.simulatorCategory
    })

    this.dialogRef.close(this.form.value);

  }

  addCode() {
    
    const codes = this.form.get('codes') as FormArray;
    if(codes.invalid){
      this.snackBar.open('Informar todos os Códigos!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      return
    }

    codes.push(this.fb.group({
      code: [null, Validators.required],
      disabled: [false]
    }));
  
  }

  removeCodeForm(position: number) {
    const codes = this.form.get('codes') as FormArray; 
    codes.removeAt(position); 
  }
  
  
  private codeValidator(control: any) {
    const value = control.value;
    const regex = /^[A-Z0-9]{6}$/; // Regex for 6 uppercase letters and numbers
    return regex.test(value) ? null : { invalidCode: true };
  }


  get codes(): FormArray {
    return this.form.get('codes') as FormArray;  // Ensure correct type
  }

  private createForm(){

    const form = this.fb.group({
      name:[null,Validators.required],
      image:[null],
      description: [null,Validators.required],
      codes:this.fb.array([
        this.fb.group({  // Create a FormGroup for each code
          code: [null, Validators.required],  
          disabled: [false]  
        })
      ]),
      simulatorCategory:['']
    })

    return form;
    
  }



}
