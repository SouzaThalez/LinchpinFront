import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../../../data/simulators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPreScenarioDialogComponent } from '../register-pre-scenario-dialog/register-pre-scenario-dialog.component';
import { RegisterScenarioDialogComponent } from '../register-scenario-dialog/register-scenario-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../../data/snackBarData';

@Component({
  selector: 'app-scenario-register-cards',
  templateUrl: './scenario-register-cards.component.html',
  styleUrl: './scenario-register-cards.component.scss'
})
export class ScenarioRegisterCardsComponent implements OnInit{
 
  routeIndex:any;
  simulators = simulators.highFidelity;
  training:any;
  registerName: string;

  snackbarMessage = 'Registro salvo com sucesso!';

  constructor(
    private activeRoute:ActivatedRoute,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar

  ){}

  ngOnInit(): void {
  
   this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      switch (this.routeIndex) {
        case '0':
          this.registerName =  'Pré-corrida';
          break;
        case '1':
          this.registerName =  'Corrida';
            break;
        case '2':
          this.registerName =  'Pós-corrida';
              break;
        default:
          break;
      }
   })


  }




  openRegisterDialogs(element: any){
    
      if(this.registerName == 'Corrida'){

        let dialogRef = this.matDialog.open(RegisterScenarioDialogComponent,{
          disableClose: true,
          width:'650px',
          data:{
            simulator: element,
            registerType: this.registerName
          }
        })
      
        dialogRef.afterClosed().subscribe(result=>{
            if(result){
              this.postScenarioReports(result);
            }
        })

        return
      }

      let dialogRef = this.matDialog.open(RegisterPreScenarioDialogComponent,{
        disableClose: true,
        width:'650px',
        data:{
          simulator: element,
          registerType: this.registerName
        }
      })
    
      dialogRef.afterClosed().subscribe(result=>{
          if(result){
            this.postScenarioReports(result);
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

  private postScenarioReports(model:any){

    this.httpClient.post('http://localhost:3000/ScenarioReports',model)
    .subscribe({
        next: (sample: any)=>{
          console.log('request to prepared class  ok!: ',sample);
          this.openSnackBar(this.snackbarMessage);
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }


}
