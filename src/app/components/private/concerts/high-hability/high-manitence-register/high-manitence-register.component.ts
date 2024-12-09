import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewLessonReportDialogComponent } from '../../../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { InterventionReportDialogComponent } from '../../../../shared/intervention-report-dialog/intervention-report-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { User } from '../../../../../models/user';
import { userRoleType } from '../../../../../enums/userRoles';
import { UserLogedService } from '../../../../../service/user-loged.service';

@Component({
  selector: 'app-high-manitence-register',
  templateUrl: './high-manitence-register.component.html',
  styleUrl: './high-manitence-register.component.scss'
})
export class HighManitenceRegisterComponent implements OnInit{


  manitanceData: any[];
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
    this.getManitenceReports();
    
    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }


  openPreviewCleaningReportDialog(element: any){
    
    let dialogRef = this.matDialog.open(PreviewLessonReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        reportData: element,
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
      this.snackBar.open('Ups! Você não tem permissão!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
    }
  }

  private updateReport(model:any){

    this.httpClient.put('http://localhost:3000/manitanceReports/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{
          this.selectedReport = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private getManitenceReports(){

    let params = new HttpParams()
        .set('hasDescription', 'true');
        // .set('manitanceCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/manitanceReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          this.manitanceData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
