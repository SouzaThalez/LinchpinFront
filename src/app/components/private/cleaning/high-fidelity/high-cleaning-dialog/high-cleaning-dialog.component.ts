import { Component, Inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../models/simulator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-high-cleaning-dialog',
  templateUrl: './high-cleaning-dialog.component.html',
  styleUrl: './high-cleaning-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class HighCleaningDialogComponent implements OnInit{

  form: FormGroup;
  checked = false;
  textMsg = 'Não houve achados durante a limpeza deste simulador';
  simulatorCodes: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<HighCleaningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: Simulator
    },
    private fb : FormBuilder,
    private matDialog: MatDialog,
  ){}
  
  ngOnInit(): void {
      this.form = this.createForm();
      
      this.simulatorCodes = this.data.simulator.codes;
  } 

  
  onClose(value: string): void {
    this.dialogRef.close(value);
  }


 
  checkBox(value: any){
    this.checked = value;
    if(this.checked){
      this.form.patchValue({
        findings:this.textMsg
      })
    }
  } 

  onSubmit(): void {
    
    if (this.form.valid) {
      console.log(this.form.value);
      return
    }

    this.openAlertDialog();

  }


  private openAlertDialog(){

    let dialogRef = this.matDialog.open(AlertDialogComponent,{
      disableClose: true,
      width:'468px',
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }


  private createForm(): FormGroup{

    const prevForm = this.fb.group({

      date: [null,Validators.required],
      cleaningCategory:[null,Validators.required],
      simulatorCategory:['alta'],
      simulatorName:[this.data.simulator.name],
      simulatorCode:[null,Validators.required],
      findings:[null,Validators.required],
      user: [],
    })

    return prevForm;
  }

}
