import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { manitenceStatusData } from '../../../data/manitenceStatusData';

@Component({
  selector: 'app-intervention-report-dialog',
  templateUrl: './intervention-report-dialog.component.html',
  styleUrl: './intervention-report-dialog.component.scss',
  providers: [provideNativeDateAdapter()],

})
export class InterventionReportDialogComponent implements OnInit{
  
  interventionForm: FormGroup;

  status: string = '';
  checked= false;
  defaultInterventionText = 'Nenhuma intervenção realizada';
  manitanceStatus = manitenceStatusData;


  constructor(
    public dialogRef: MatDialogRef<InterventionReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb : FormBuilder,
    private snackBar: MatSnackBar
  ) {}


  
  ngOnInit(): void {
    this.interventionForm = this.createForm();
  }

  onClose(): void {
    this.dialogRef.close({ cancel: true });
  }

  checkBox(){
    this.checked = !this.checked;
    if(this.checked == true){
      this.interventionForm.patchValue({interventionText: this.defaultInterventionText});
    }else{
      this.interventionForm.patchValue({interventionText: ''});
    }
  }

  onSubmit(){
    
    if(this.interventionForm.valid){
      let momentDate = moment(this.interventionForm.value.interventionDate).format('DD-MM-YYYY');
      this.interventionForm.patchValue({interventionDate: momentDate});
      this.dialogRef.close(this.interventionForm.value);

    }else{
      // this.snackBar.open('Ainda existem campos Vermelhos!', 'Fechar',{
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      //   duration: this.durationInSeconds * 1000
      // });
    }


  }
  
  private createForm(): FormGroup{

    const interForm = this.fb.group({
      interventionText: [null,Validators.required],
      interventionDate: [null, Validators.required],
      interventionStatus: [null, Validators.required],
      interventionUser: [],
    })

    return interForm;
}


}
