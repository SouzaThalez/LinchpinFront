import { Component, Inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../models/simulator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import moment from 'moment';
import { UserLogedService } from '../../../../../service/user-loged.service';
import { User } from '../../../../../models/user';

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
  snackbarMessage = 'Registro salvo com sucesso!';
  simulatorCodes: Array<any> = [];
  currentUser: User;
  cleaningReports: any[];
  osModel = {
    osCode:'',
    osDate: '',
    osTag:'',
    simulator:[]
  }
  userModel = {
    name:'',
    role:''
  }

  constructor(
    public dialogRef: MatDialogRef<HighCleaningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: Simulator
    },
    private fb : FormBuilder,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private userLogedService : UserLogedService
  ){}
  
  ngOnInit(): void {
      this.form = this.createForm();
      this.simulatorCodes = this.data.simulator.codes;
      this.getCleaningReports();

      this.userLogedService.getCurrentUser()
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          this.userModel.name = this.currentUser.name;
          this.userModel.role = this.currentUser.role;
        }
      });
      
  } 

  
  onClose(value: any): void {

    this.dialogRef.close(value); // passing the dataValue to dialog
    this.openSnackBar(this.snackbarMessage);
  }
 
  checkBox(value: any){
    this.checked = value;
    if(this.checked){
      this.form.patchValue({
        findings:this.textMsg,
        hasDescription:false,
      })
    }
  } 

  onSubmit(): void {
    
    if (this.form.valid) {

      

      let momentDate = moment(this.form.value.date).format('DD-MM-YYYY');
      this.form.patchValue({date: momentDate});

      const foundObject = this.cleaningReports.find(
        element => element.osTag === this.form.value.simulatorCode
      );

      
      if (foundObject) {

        const model = this.form.value;
        this.osModel.osCode = '72000',
        this.osModel.osDate = '10-08-2026',
        this.osModel.osTag = model.simulatorCode,
        this.osModel.simulator.push(model);

        foundObject.simulator.push(this.osModel);
debugger
        this.updateCleaningReport(foundObject.id,foundObject);
        this.onClose(model);
        return
      }


      this.osModel.osCode = '7855',
      this.osModel.osDate = '03-08-2026',
      this.osModel.osTag = this.form.value.simulatorCode,
      this.osModel.simulator.push(this.form.value);
     
      const model = this.osModel;
   
      this.postCleaningReports(model);
      this.onClose(model);

      return
    }

    this.openAlertDialog();

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

  private postCleaningReports(model:any){

    this.httpClient.post('http://localhost:3000/CleaningReports',model)
    .subscribe({
        next: (sample: any)=>{
          console.log('request to prepared class  ok!: ',sample);
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private getCleaningReports(){
      // returns data who meets theese 2 conditions
      let params = new HttpParams()
        .set('hasDescription', 'true')
        .set('simulatorCategory', 'alta');
      
      this.httpClient.get('http://localhost:3000/CleaningReports/', { params })
      .subscribe({
          next: (sample: any)=>{
            this.cleaningReports = sample;
           
          },
          error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
      })
  }
  
private updateCleaningReport(id: number, newSimulator: any) {
debugger
  this.httpClient.put(`http://localhost:3000/CleaningReports/${id}`,newSimulator)
  .subscribe(() => {
          console.log('Simulador adicionado!');
          console.error();
          
        });




  // this.httpClient.get<any>(`http://localhost:3000/CleaningReports/${id}`)
  //   .subscribe(report => {

  //     report.simulator.push(newSimulator);

  //     this.httpClient.put(`http://localhost:3000/CleaningReports/${id}`,report).subscribe(
  //       () => {
  //       console.log('Simulador adicionado!');
  //     });

  //   });

}






  private createForm(): FormGroup{

    const prevForm = this.fb.group({

      date: [null,Validators.required],
      cleaningCategory:[null,Validators.required],
      simulatorCategory:['alta'],
      simulatorName:[this.data.simulator.name],
      simulatorCode:[null,Validators.required],
      findings:[null,Validators.required],
      hasDescription:[true],
      hasIntervention:[false],
      simulatorImage:[this.data.simulator.image],
      user: [this.userModel],
    })

    return prevForm;
  }

}
