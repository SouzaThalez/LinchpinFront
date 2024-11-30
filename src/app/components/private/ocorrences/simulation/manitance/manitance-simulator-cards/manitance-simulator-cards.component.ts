import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ocorranceData } from '../../../../../../data/ocorranceData';
import { simulators } from '../../../../../../data/simulators';
import { RegisterManitanceDialogComponent } from '../register-manitance-dialog/register-manitance-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../../data/snackBarData';

@Component({
  selector: 'app-manitance-simulator-cards',
  templateUrl: './manitance-simulator-cards.component.html',
  styleUrl: './manitance-simulator-cards.component.scss'
})
export class ManitanceSimulatorCardsComponent implements OnInit{


  
  routeIndex:any;
  simulators: any;
  manitanceName: string;
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
          this.manitanceName =  'Básica';
          break;
        case '1':
          this.manitanceName =  'Geral';
            break;
        default:
          break;
      }

      this.getHightSimulators();
   })


  }


  openRegisterManitanceDialog(element: any){


    let dialogRef = this.matDialog.open(RegisterManitanceDialogComponent,{
        disableClose: true,
        width:'650px',
        data:{
          simulator: element,
          manitance: this.manitanceName
        }
    })
    
    dialogRef.afterClosed().subscribe(result=>{
          if(result){
            
            this.postManitanceReports(result);
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

  private postManitanceReports(model:any){

    this.httpClient.post('http://localhost:3000/manitanceReports',model)
    .subscribe({
        next: (sample: any)=>{
          this.openSnackBar(this.snackbarMessage);
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private getHightSimulators(){
    
    this.httpClient.get('http://localhost:3000/highSimulators').subscribe({
      next:(sample: any)=>{
        this.simulators = sample;
        
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }




}
