import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { checkBoxesData } from '../../../../../../data/checkBoxesData';
import { Simulator } from '../../../../../../models/simulator';
import { disciplines } from '../../../../../../data/disciplines';

@Component({
  selector: 'app-register-scenario-dialog',
  templateUrl: './register-scenario-dialog.component.html',
  styleUrl: './register-scenario-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterScenarioDialogComponent implements OnInit{

  noFailText = 'Nenhuma Falha';
  simulatorText = 'Nenhuma descrição de falha durante a execução de cenário';
  formInputs:string[]=['Nenhuma Falha','Falha registrada'];
  disciplines = disciplines;
  allcCheckBoxData = checkBoxesData;
  user = { name:'',role:''};
  simulatorForm: FormGroup;
  
  hasDescription = false;
  lessonTextArea=false;
  checkedBoxes:any[]=[];
  selectedItem: {
    label: string,
    value:number
  };
  

  constructor(
    // private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterScenarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: Simulator,
      registerType: string
    },
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

  getCheckedElement(element:any){
    element.value = !element.value;
    this.checkedBoxes = this.allcCheckBoxData.prevCheckboxes.filter((element:any) => element.value == true);
    // this.preventiveForm.patchValue({procedures:this.checkedBoxes});
  }
  
  onChangeAllChecked(isChecked:any){
    if(isChecked){
      this.allcCheckBoxData.preScenarioCheckboxes.forEach((element:any)=> element.value = true);
      // this.preventiveForm.patchValue({procedures:this.allcCheckBoxData.prevCheckboxes});
    }else{
      this.allcCheckBoxData.preScenarioCheckboxes.forEach((element:any)=> element.value = false);
      // this.preventiveForm.patchValue({procedures:[]});
    }
    
  }
  
  onChangeOcorrance(isChecked:boolean){
      this.hasDescription = isChecked;
      
    // if(isChecked){
    //   this.simulatorForm.patchValue({
    //     noDescription: isChecked,
    //   })
    // }
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

  getSelectedItem(){
   
    this.selectedItem =  this.simulatorForm.get('selectedItem').value;


  }
  
  timeValidator(control: AbstractControl): ValidationErrors | null {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM
    if (control.value && !timePattern.test(control.value)) {
      return { invalidTime: true };
    }
    return null;
  }



  private simFormCreation(): FormGroup{

    const simulatoForm = this.fb.group({
      date: [null,Validators.required],
      time: [null,Validators.required],
      noDescription: [false],
      selectedItem:[],
      description:[null,Validators.required],
      showTextArea: [false],
      
      discipline:[null, Validators.required],
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
      
      simulatorType:['Alta'],
      user: []
    })

    return simulatoForm;
  }




}


