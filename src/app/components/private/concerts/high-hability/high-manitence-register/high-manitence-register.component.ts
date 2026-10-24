import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewLessonReportDialogComponent } from '../../../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { InterventionReportDialogComponent } from '../../../../shared/intervention-report-dialog/intervention-report-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { interventionRoles, ticketBadgeClass, ticketStatus } from '../../../../../data/ticketStatusData';
import { User } from '../../../../../models/user';
import { UserLogedService } from '../../../../../service/user-loged.service';
import { InterventionApiService } from '../../../../../service/intervention-api.service';

import { InterventionForm } from '../../../../../models/intervention';

import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-high-manitence-register',
  templateUrl: './high-manitence-register.component.html',
  styleUrl: './high-manitence-register.component.scss'
})
export class HighManitenceRegisterComponent implements OnInit{


  manitanceData: any[];
  selectedReport: any;
  
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
    this.getManitenceReports();
    
    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }


  openPreviewLessonReportDialog(element: any){
    
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

    if(!interventionRoles.includes(this.currentUser?.role)){
      this.openSnackBar('Ups! Apenas administradores e analistas podem realizar uma intervenção!');
      return
    }

    let dialogRef = this.matDialog.open(InterventionReportDialogComponent,{
      disableClose: true,
      width:'650px',
      // reabre a intervenção já registrada para atualizar o status do chamado
      data: { intervention: report.intervention },
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.registerIntervention(report, result);
      }
    })
  }

  private registerIntervention(report: any, form: InterventionForm){

    const request = report.intervention
      ? this.interventionApi.update(report.intervention.id, form)
      : this.interventionApi.create('manutenção', report.id, form);

    request.subscribe({
        next: (intervention)=>{
          report.intervention = intervention;
          report.interventionId = intervention.id;
          report.hasIntervention = true;
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

  private getManitenceReports(){

    let params = new HttpParams()
        .set('hasDescription', 'true');
        // .set('manitanceCategory', 'baixa');
    
    this.httpClient.get(environment.apiUrl + '/maintenance-reports/', { params })
    .subscribe({
        next: (sample: any)=>{
          this.manitanceData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
