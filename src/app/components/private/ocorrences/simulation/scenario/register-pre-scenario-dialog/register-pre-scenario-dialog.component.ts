import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../../models/simulator';
import { checkBoxesData } from '../../../../../../data/checkBoxesData';
import moment from 'moment';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AlertDialogComponent } from '../../../../../shared/alert-dialog/alert-dialog.component';
import { disciplines } from '../../../../../../data/disciplines';

@Component({
  selector: 'app-register-pre-scenario-dialog',
  templateUrl: './register-pre-scenario-dialog.component.html',
  styleUrl: './register-pre-scenario-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterPreScenarioDialogComponent implements OnInit{

  noFailText = 'Nenhuma Falha';
  simulatorText = 'Nenhuma descrição de falha durante a execução de cenário';
  defaultMessage = `Não houve registro de intercorrências durante a ${this.data.registerType} de cenário`;

  user = { name:'',role:''};
  form: FormGroup;
  allcCheckBoxData = checkBoxesData;
  disciplines = disciplines;
  isChecked = false;

  checkedBoxes:any[]=[];
  itemOcorrance: {
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
    private matDialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.form = this.simFormCreation();
  }

  onSubmit(){
        
    if(this.isChecked){
      this.form.patchValue({
        scenarioOcorrance:this.defaultMessage ,
        itemOcorrance:'Não informado',
        hasDescription:false
       });
    }else{
      this.form.patchValue({hasDescription:true});
    }


    if (this.form.valid) {

      let momentDate = moment(this.form.value.date).format('DD-MM-YYYY');
      this.form.patchValue({date: momentDate});

      const model = this.form.value;
      // this.postCleaningReports(model);
   
        this.onClose(model);
      return
    }


    this.openAlertDialog();
  }

  onClose(value: any): void {
    this.dialogRef.close(value);
    // this.openSnackBar(this.snackbarMessage);
  }

  checkBoxDescription(value:boolean){
    this.isChecked = value;
  }



  // simulatorCheckBox(value:any){
  //   if(value){

  //     this.form.patchValue(
  //       {
  //       simulatorRegister:this.noFailText,
  //       monitorRegister: this.noFailText,
  //       medicationCarRegister: this.noFailText,
  //       energyPanelRegister: this.noFailText,
  //       airFlowRegister: this.noFailText,
  //       internetCableRegister: this.noFailText,
  //       audioAndMediaRegister:this.noFailText,
  //       otherRegister:this.noFailText,
  //     })
      
  //   }else{  
  //     this.form.patchValue(
  //       {
  //       simulatorRegister:'',
  //       monitorRegister: '',
  //       medicationCarRegister: '',
  //       energyPanelRegister: '',
  //       airFlowRegister: '',
  //       internetCableRegister: '',
  //       audioAndMediaRegister:'',
  //       otherRegister: ''
  //     })
  //   }
  // }

  
  getCheckedElement(element:any){
    element.value = !element.value;
    this.checkedBoxes = this.allcCheckBoxData.preScenarioCheckboxes.filter((element:any) => element.value == true);
    this.form.patchValue({scenarioRegister:this.checkedBoxes});
  }
  
  onChangeAllChecked(isChecked:any){
    if(isChecked){
      this.allcCheckBoxData.preScenarioCheckboxes.forEach((element:any)=> element.value = true);
      this.form.patchValue({scenarioRegister:this.allcCheckBoxData.preScenarioCheckboxes});
    }else{
      this.allcCheckBoxData.preScenarioCheckboxes.forEach((element:any)=> element.value = false);
      this.form.patchValue({scenarioRegister:[]});
    }
    
  }
  
  getSimulator(){

    // this.appService.validateForm(this.simulatorForm);

    if(this.form.valid){
      let momentDate = moment(this.form.value.date).format('DD-MM-YYYY');
      this.form.patchValue({date:momentDate});
      // this.dialogRef.close(this.form.value);
      
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
    this.itemOcorrance =  this.form.get('itemOcorrance').value;
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
      scenarioRegister:[null,Validators.required],
      scenarioCategory:[this.data.registerType],
      scenarioOcorrance:[null,Validators.required],
      simulatorName:[this.data.simulator.name],
      simulatorCode:[this.data.simulator.codes[0]],
      simulatorImage:[this.data.simulator.image],
      discipline:[null, Validators.required],
      hasDescription: [false],
      itemOcorrance:[],
      user: []
    })

    return simulatoForm;
  }



 

}
