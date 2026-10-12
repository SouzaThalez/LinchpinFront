import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { manitenceTypeData } from '../../../data/manitenceTypeData';
import { maintenanceStatusData } from '../../../data/maintenanceStatusData';
import { Intervention, InterventionForm } from '../../../models/intervention';

// Formulário de intervenção. Devolve um InterventionForm ao fechar; quem abriu registra em /interventions.
// Recebe data.intervention para editar uma intervenção já registrada.
@Component({
  selector: 'app-intervention-report-dialog',
  templateUrl: './intervention-report-dialog.component.html',
  styleUrl: './intervention-report-dialog.component.scss',
  providers: [provideNativeDateAdapter()],

})
export class InterventionReportDialogComponent implements OnInit{

  interventionForm: FormGroup;
  checked= false;
  defaultInterventionText = 'Nenhuma intervenção realizada';
  manitanceType = manitenceTypeData;
  manitanceStatus = maintenanceStatusData;


  constructor(
    public dialogRef: MatDialogRef<InterventionReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { intervention?: Intervention } | null,
    private fb : FormBuilder,
  ) {}



  ngOnInit(): void {
    this.interventionForm = this.createForm();
    this.checked = this.data?.intervention?.description === this.defaultInterventionText;
  }

  onClose(): void {
    this.dialogRef.close({ cancel: true });
  }

  checkBox(){
    this.checked = !this.checked;
    if(this.checked == true){
      this.interventionForm.patchValue({description: this.defaultInterventionText});
    }else{
      this.interventionForm.patchValue({description: ''});
    }
  }

  onSubmit(){

    if(this.interventionForm.valid){
      const form: InterventionForm = {
        ...this.interventionForm.value,
        date: moment(this.interventionForm.value.date).format('DD-MM-YYYY')
      };
      this.dialogRef.close(form);
    }
  }

  private createForm(): FormGroup{

    const intervention = this.data?.intervention;
    const interForm = this.fb.group({
      description: [intervention?.description ?? null, Validators.required],
      date: [intervention ? moment(intervention.date, 'DD-MM-YYYY').toDate() : null, Validators.required],
      type: [intervention?.type ?? null, Validators.required],
      status: [intervention?.status ?? this.manitanceStatus[0]?.text, Validators.required],
    })

    return interForm;
}


}
