import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../../models/simulator';
import { checkBoxesData } from '../../../../../../data/checkBoxesData';
import moment from 'moment';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-register-pre-scenario-dialog',
  templateUrl: './register-pre-scenario-dialog.component.html',
  styleUrl: './register-pre-scenario-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterPreScenarioDialogComponent implements OnInit{

  noFailText = 'Nenhuma Falha';
  simulatorText = 'Nenhuma descrição de falha durante a execução de cenário';
  user = { name:'',role:''};
  simulatorForm: FormGroup;
  allcCheckBoxData = checkBoxesData;
  hasDescription = false;
  checkedBoxes:any[]=[];
  selectedItem: {
    label: string,
    value:number
  };
  

  constructor(
    // private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterPreScenarioDialogComponent>,
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
 
  private simFormCreation(): FormGroup{

    const simulatoForm = this.fb.group({
      date: [null,Validators.required],
      time: [null,Validators.required],
      noDescription: [false],
      selectedItem:[],
      description:[null,Validators.required],
      showTextArea: [false],
      simulatorType:['Alta'],
      user: []
    })

    return simulatoForm;
  }

 

}
