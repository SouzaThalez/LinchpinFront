import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { checkBoxesData } from '../../../../../../data/checkBoxesData';
import { Simulator } from '../../../../../../models/simulator';
import { disciplines } from '../../../../../../data/disciplines';
import { AlertDialogComponent } from '../../../../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-register-scenario-dialog',
  templateUrl: './register-scenario-dialog.component.html',
  styleUrl: './register-scenario-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterScenarioDialogComponent implements OnInit{

  noFailText = 'Nenhuma Falha';
  formInputs:string[]=['Nenhuma Falha','Falha registrada'];
  defaultMessage = `Não houve registro de intercorrências ou falhas durante a ${this.data.registerType} de cenário`;
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
    private matDialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.simulatorForm = this.simFormCreation();
  }

  onSubmit(){
    
    if (this.simulatorForm.valid) {

      let momentDate = moment(this.simulatorForm.value.date).format('DD-MM-YYYY');
      this.simulatorForm.patchValue({date: momentDate});

      const model = this.simulatorForm.value;
      this.onClose(model);
      return
    }

    this.openAlertDialog();


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

  
  onClose(value: any): void {
    this.dialogRef.close(value);
  }


  textAreaCheckBox(value:any){
    
    if(value){
      this.simulatorForm.patchValue(
            {
              description:{descriptionInfo: this.defaultMessage},
              showTextArea:true
            }
        );
    }else{
      this.simulatorForm.patchValue(
            {
              description:{descriptionInfo:''},
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


  private simFormCreation(): FormGroup{

    const simulatoForm = this.fb.group({
      date: [null,Validators.required],
      time: [null,Validators.required],
      noDescription: [false],
    
      description:[null,Validators.required],
      showTextArea: [false],
      
      discipline:[null, Validators.required],
      simulatorName:[this.data.simulator.name],
      simulatorCode:[this.data.simulator.codes[0]],
      simulatorImage:[this.data.simulator.image],
      simulatorRegister:[null, Validators.required],
      monitorRegister: [null, Validators.required],
      medicationCarRegister: [null, Validators.required],
      energyPanelRegister: [null, Validators.required],
      airFlowRegister: [null, Validators.required],
      internetCableRegister: [null, Validators.required],
      otherRegister: [null, Validators.required],
      audioAndMediaRegister:[null, Validators.required],
      
      scenarioCategory:[this.data.registerType],
      user: []
    })

    return simulatoForm;
  }


  

}


