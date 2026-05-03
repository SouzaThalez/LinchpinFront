import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { simulators } from '../../../../../data/simulators';
import { Lesson } from '../../../../../models/lesson';
import { Simulator } from '../../../../../models/simulator';
import moment from 'moment';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { SimulatorReport } from '../../../../../models/simulatorReport';
import { HttpClient } from '@angular/common/http';
import { UserLogedService } from '../../../../../service/user-loged.service';
import { User } from '../../../../../models/user';

@Component({
  selector: 'app-ocorrance-dialog',
  templateUrl: './ocorrance-dialog.component.html',
  styleUrl: './ocorrance-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class OcorranceDialogComponent implements OnInit{

  //Checkboxes
  checked = false;
  isValid = false;
  defaultLessonMessage = 'Não houve registro de ocorrência de aula';
  defaultSimulatorMessage = 'Não houve ocorrência de Simulador';
  snackbarMessage = 'Registro salvo com sucesso!';
  lessonImgPath = "assets/images/logo/th-logo.png";

  selectedSimulator: Simulator;

  mediumSimulators: any;
  simulatorCodes: Array<any> = [];
  currentUser: User;
  userModel = {
    name:'',
    role:''
  }

  form: FormGroup = this.createForm();

  constructor(
    public dialogRef: MatDialogRef<OcorranceDialogComponent>,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {
      selectedLesson: Lesson,
      training: any
    },
    private fb : FormBuilder,
    private snackBar: MatSnackBar,
    public userLogedService : UserLogedService
  ){}
  
  ngOnInit(): void {
    
    this.form = this.createForm();

    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
        this.userModel.name = this.currentUser.name;
        this.userModel.role = this.currentUser.role;
      }
    });
    
    this.getMediumSimulators();
  
  } 

  
  onClose(value: any): void {
    this.dialogRef.close(value);
    this.openSnackBar(this.snackbarMessage);
  }


  checkBox(value: any){
    this.checked = value;
    this.form.patchValue({
      lessonOcorrance: this.defaultLessonMessage,
      lessonDescription:false,
    })
  }

  checkSimBox(value: any){

    this.isValid = value;
    if(this.isValid){

      const noReportInfo = new SimulatorReport();
      noReportInfo.code = 'Não informado' ; 
      noReportInfo.date = 'Não informado' ;
      noReportInfo.image = 'Não informado' ;
      noReportInfo.name = 'Não informado' ;
      noReportInfo.ocorrance = this.defaultSimulatorMessage ;
      noReportInfo.simulatorCategory = 'Não informado' ;

      this.form.patchValue({
        simulatorDescription: false,
        simulatorReport: noReportInfo
      })

    }
    
  }

  getSimulator(simulator: any) {

    this.selectedSimulator = simulator;
    this.simulatorCodes = simulator.codes;

    this.form.patchValue({
      simulatorReport:{
        image: this.selectedSimulator.image
      }
  
    })
    
  }

  getCode(code:any){
   
    this.form.patchValue({
      simulatorCode: code
    })
  }

  submitForm(){

  

    if (this.form.valid) {

      let momentDate = moment(this.form.value.date).format('DD-MM-YYYY');
      let simulatorReport = this.getSimulatorReport();
      simulatorReport.date = momentDate;
     
      this.form.patchValue({
        date: momentDate,
        simulatorReport: simulatorReport
    
      })
      
      //send data to ocorrance Dialog
      this.onClose(this.form.value);
      
      return
    }
   
    this.openAlertDialog();



  }

  private getSimulatorReport(): SimulatorReport {
    
    const simulatorReportValue = this.form.get('simulatorReport')?.value;
    const simReport = new SimulatorReport();
    // Map form values to the instance  
    Object.assign(simReport, simulatorReportValue);

    return simReport;
  }


  private openSnackBar(message: string): void {

    this.snackBar.open(message, 'Close', {
      horizontalPosition: snackBarConfig.horizontalPosition,
      verticalPosition: snackBarConfig.verticalPosition,
      duration: snackBarConfig.durationInSeconds * 1000 
    });

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
      lessonName:[this.data.selectedLesson.name],
      lessonOcorrance:[],
      lessonDescription:[true],
      lessonImage:[this.lessonImgPath],
      lessonCategory:[this.data.training.name],
      lessonType:[this.data.training.value],
      user: [this.userModel],
      simulatorDescription:[true],
      simulatorReport: this.fb.group({
        name: [null,Validators.required],
        code: [null,Validators.required],
        image: [],
        ocorrance: [null,Validators.required],
        simulatorCategory: ['media'],
        date: []
      }),
      hasIntervention:[false],
    })

    return prevForm;
  }

  private getMediumSimulators(){

    this.httpClient.get('http://localhost:3000/mediumSimulators').subscribe({
      next:(sample: any)=>{
        this.mediumSimulators = sample;
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }


}
