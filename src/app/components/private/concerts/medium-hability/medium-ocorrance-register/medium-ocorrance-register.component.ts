import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewSimulatorReportDialogComponent } from '../../../../shared/preview-simulator-report-dialog/preview-simulator-report-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { InterventionReportDialogComponent } from '../../../../shared/intervention-report-dialog/intervention-report-dialog.component';
import { User } from '../../../../../models/user';
import { userRoleType } from '../../../../../enums/userRoles';
import { UserLogedService } from '../../../../../service/user-loged.service';

@Component({
  selector: 'app-medium-ocorrance-register',
  templateUrl: './medium-ocorrance-register.component.html',
  styleUrl: './medium-ocorrance-register.component.scss'
})
export class MediumOcorranceRegisterComponent implements OnInit{

  lessonData: any[];
  selectedReport:any;
  currentUser: User;
  userAnalystRole = userRoleType.analyst;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private userLogedService : UserLogedService
  ){}


  
  ngOnInit(): void {
    this.getLessonReports();

    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }

  openPreviewSimulatorReportDialog(element: any){
    
    let dialogRef = this.matDialog.open(PreviewSimulatorReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        reportData: element
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

  
  openInterventionReport(report: any){

    if(report.hasIntervention){

      this.snackBar.open('Ups! Ja foi registrado uma intervenção!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });

      return

    }

    if(this.currentUser.role == this.userAnalystRole){

      let dialogRef = this.matDialog.open(InterventionReportDialogComponent,{
        disableClose: true,
        width:'650px',
      })
  
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          //adding interventionReport to model 
          report.intervention = result;
          report.hasIntervention = true;
          this.updateReport(report);
        }
      })

    }else{
       
      this.snackBar.open('Ups! não é possivél realizar uma intervenção!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
    }

  }

  private updateReport(model:any){
  
    this.httpClient.put('http://localhost:3000/LessonReports/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{
          this.selectedReport = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private getLessonReports(){
    // returns data who meets theese 2 conditions
    let params = new HttpParams()
      .set('simulatorDescription', 'true');
    
    this.httpClient.get('http://localhost:3000/LessonReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          this.lessonData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }



}
