import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewCleaningReportDialogComponent } from '../../../../shared/preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';
import { InterventionReportDialogComponent } from '../../../../shared/intervention-report-dialog/intervention-report-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { User } from '../../../../../models/user';
import { userRoleType } from '../../../../../enums/userRoles';
import { UserLogedService } from '../../../../../service/user-loged.service';

@Component({
  selector: 'app-high-cleaning-register',
  templateUrl: './high-cleaning-register.component.html',
  styleUrl: './high-cleaning-register.component.scss'
})
export class HighCleaningRegisterComponent implements OnInit{
  
  
  cleaningData: any[];
  selectedReport: any;
  currentUser: User;
  userAnalystRole = userRoleType.analyst;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private userLogedService : UserLogedService
  ){}


  ngOnInit(): void {
    this.getCleaningReports();

    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }


  openPreviewCleaningReportDialog(element: any){
    
    let dialogRef = this.matDialog.open(PreviewCleaningReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        simulatorData: element,
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

    this.httpClient.put('http://localhost:3000/CleaningReports/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{
          this.selectedReport = sample;
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
          this.cleaningData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
