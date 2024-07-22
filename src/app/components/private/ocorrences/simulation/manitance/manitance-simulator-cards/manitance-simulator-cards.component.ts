import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ocorranceData } from '../../../../../../data/ocorranceData';
import { simulators } from '../../../../../../data/simulators';
import { RegisterManitanceDialogComponent } from '../register-manitance-dialog/register-manitance-dialog.component';

@Component({
  selector: 'app-manitance-simulator-cards',
  templateUrl: './manitance-simulator-cards.component.html',
  styleUrl: './manitance-simulator-cards.component.scss'
})
export class ManitanceSimulatorCardsComponent implements OnInit{


  
  routeIndex:any;
  simulators = simulators.highFidelity;
  training:any;
  manitanceName: string;

  constructor(
    private activeRoute:ActivatedRoute,
    private matDialog: MatDialog,
  ){}

  ngOnInit(): void {
  
   this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      switch (this.routeIndex) {
        case '0':
          this.manitanceName =  'Primária';
          break;
        case '1':
          this.manitanceName =  'Secundária';
            break;
        case '2':
          this.manitanceName =  'Geral';
              break;
        default:
          break;
      }
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
            
          }
    })


  }




}
