import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewLessonReportDialogComponent } from '../../../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { InterventionReportDialogComponent } from '../../../../shared/intervention-report-dialog/intervention-report-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { UserLogedService } from '../../../../../service/user-loged.service';
import { InterventionApiService } from '../../../../../service/intervention-api.service';
import { User } from '../../../../../models/user';
import { userRoleType } from '../../../../../enums/userRoles';
import { LessonReport, lessonReportImages } from '../../../../../models/lessonReport';

import { InterventionForm } from '../../../../../models/intervention';

import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-ocorrance-registers',
  templateUrl: './ocorrance-registers.component.html',
  styleUrl: './ocorrance-registers.component.scss'
})
export class OcorranceRegistersComponent implements OnInit{

  lessonReportData: LessonReport[];
  lessonImages = lessonReportImages;
  currentUser: User;
  userAnalystRole = userRoleType.analyst;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private userLogedService : UserLogedService,
    private interventionApi: InterventionApiService
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


  openPreviewLessonReportDialog(element: LessonReport){

    this.matDialog.open(PreviewLessonReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        reportData: element
      }
    })
  }

  openInterventionReport(report: LessonReport){

    if(report.hasLessonIntervention){

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
          this.registerIntervention(report, result);
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

  private getLessonReports(){

    let params = new HttpParams().set('hasLessonOccurrence', 'true');

    this.httpClient.get<LessonReport[]>(environment.apiUrl + '/lesson-reports/', { params })
    .subscribe({
        next: (sample)=>{
          this.lessonReportData = sample;
        },
        error: (erro)=>{console.log('request to lesson-reports is NOT good: ',erro);}
    })
  }

  private registerIntervention(report: LessonReport, form: InterventionForm){

    this.interventionApi.create('aula', report.id, form)
    .subscribe({
        next: (intervention)=>{
          report.lessonIntervention = intervention;
          report.lessonInterventionId = intervention.id;
          report.hasLessonIntervention = true;
        },
        error: (erro)=>{
          console.log('request to interventions is NOT good: ',erro);
          this.openSnackBar(erro.error?.title ?? 'Não foi possível registrar a intervenção.');
        }
    })
  }

  private openSnackBar(message: string): void {

    this.snackBar.open(message, 'Close', {
      horizontalPosition: snackBarConfig.horizontalPosition,
      verticalPosition: snackBarConfig.verticalPosition,
      duration: snackBarConfig.durationInSeconds * 1000
    });
  }

}
