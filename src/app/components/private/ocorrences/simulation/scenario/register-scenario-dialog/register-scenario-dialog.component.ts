import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-register-scenario-dialog',
  templateUrl: './register-scenario-dialog.component.html',
  styleUrl: './register-scenario-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterScenarioDialogComponent implements OnInit{

  noFailText = 'Nenhuma Falha';
  simulatorText = 'Nenhuma descrição de falha durante a execução de cenário';
  user = { name:'',role:''};
  simulatorForm: FormGroup;


  constructor(
    // private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterScenarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
  ){}
  ngOnInit(): void {
    this.simulatorForm = this.simFormCreation();
  }


  
  simulatorCheckBox(value:any){
    if(value){

      this.simulatorForm.patchValue(
        {
        simulatorRegister:this.noFailText,
        monitorRegister: this.noFailText,
        medicationCarRegister: this.noFailText,
        energyPanelRegister: this.noFailText,
        airFlowRegister: this.noFailText,
        internetCableRegister: this.noFailText,
        audioAndMediaRegister:this.noFailText,
        otherRegister:this.noFailText,
      })
      
    }else{  
      this.simulatorForm.patchValue(
        {
        simulatorRegister:'',
        monitorRegister: '',
        medicationCarRegister: '',
        energyPanelRegister: '',
        airFlowRegister: '',
        internetCableRegister: '',
        audioAndMediaRegister:'',
        otherRegister: ''
      })
    }
  }
  textAreaCheckBox(value:any){
    
    if(value){
      this.simulatorForm.patchValue(
            {
              description:{hasDescription:!value, descriptionInfo:this.simulatorText},
              showTextArea:true
            }
        );
    }else{
      this.simulatorForm.patchValue(
            {
              description:{hasDescription:!value, descriptionInfo:''},
              showTextArea:false
            }
        );
    }
  }
  
  private simFormCreation(): FormGroup{

    const simulatoForm = this.fb.group({
      date: [null,Validators.required],
      time: [null,Validators.required],
      description: this.fb.group({
        hasDescription:[true],
        descriptionInfo:[null,Validators.required]
      }), 
      disciplineRegister:[null, Validators.required],
      simulatorName:[],
      simulatorCode:[],
      simulatorImage:[],
      simulatorRegister:[null, Validators.required],
      monitorRegister: [null, Validators.required],
      medicationCarRegister: [null, Validators.required],
      energyPanelRegister: [null, Validators.required],
      airFlowRegister: [null, Validators.required],
      internetCableRegister: [null, Validators.required],
      otherRegister: [null, Validators.required],
      audioAndMediaRegister:[null, Validators.required],
      showTextArea: [false],
      simulatorType:['Alta'],
      user: []
    })

    return simulatoForm;
  }

  getSimulator(){

    // this.appService.validateForm(this.simulatorForm);

    if(this.simulatorForm.valid){
      let momentDate = moment(this.simulatorForm.value.date).format('DD-MM-YYYY');
      this.simulatorForm.patchValue({date:momentDate});
      this.dialogRef.close(this.simulatorForm.value);
      
      // this.snackBar.open('Acompanhamento registrado com sucesso!', 'Fechar',{
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      //   duration: this.durationInSeconds * 1000
      // });
      
    }else{
      // this.snackBar.open('Ainda existem campos Vermelhos!', 'Fechar',{
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      //   duration: this.durationInSeconds * 1000
      // });
    }
  }


}


