import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewSimulatorReportDialogComponent } from '../../../../shared/preview-simulator-report-dialog/preview-simulator-report-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { interventionRoles, ticketBadgeClass, ticketStatus } from '../../../../../data/ticketStatusData';
import { InterventionReportDialogComponent } from '../../../../shared/intervention-report-dialog/intervention-report-dialog.component';
import { User } from '../../../../../models/user';
import { UserLogedService } from '../../../../../service/user-loged.service';
import { InterventionApiService } from '../../../../../service/intervention-api.service';
import { LessonReport, lessonReportImages } from '../../../../../models/lessonReport';

import { InterventionForm } from '../../../../../models/intervention';

import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-medium-ocorrance-register',
  templateUrl: './medium-ocorrance-register.component.html',
  styleUrl: './medium-ocorrance-register.component.scss'
})
export class MediumOcorranceRegisterComponent implements OnInit{

  lessonData: LessonReport[];
  lessonImages = lessonReportImages;
  currentUser: User;
  ticketStatus = ticketStatus;
  ticketBadgeClass = ticketBadgeClass;

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

  openPreviewSimulatorReportDialog(element: LessonReport){
    
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

  
  openInterventionReport(report: LessonReport){

    if(!interventionRoles.includes(this.currentUser?.role)){
      this.openSnackBar('Ups! Apenas administradores e analistas podem realizar uma intervenção!');
      return
    }

    let dialogRef = this.matDialog.open(InterventionReportDialogComponent,{
      disableClose: true,
      width:'650px',
      // reabre a intervenção já registrada para atualizar o status do chamado
      data: { intervention: report.simulatorIntervention },
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.registerIntervention(report, result);
      }
    })
  }

  private registerIntervention(report: LessonReport, form: InterventionForm){

    const request = report.simulatorIntervention
      ? this.interventionApi.update(report.simulatorIntervention.id, form)
      : this.interventionApi.create('simulador', report.id, form);

    request.subscribe({
        next: (intervention)=>{
          report.simulatorIntervention = intervention;
          report.simulatorInterventionId = intervention.id;
          report.hasSimulatorIntervention = true;
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

  private getLessonReports(){
    // chamados de simulador (média fidelidade) abertos durante as aulas
    let params = new HttpParams()
      .set('hasSimulatorOccurrence', 'true')
      .set('simulatorCategory', 'media');

    this.httpClient.get<LessonReport[]>(environment.apiUrl + '/lesson-reports/', { params })
    .subscribe({
        next: (sample)=>{
          this.lessonData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }



}
