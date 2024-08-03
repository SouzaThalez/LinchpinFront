import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../../../data/simulators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterScenarioDialogComponent } from '../register-scenario-dialog/register-scenario-dialog.component';

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

  constructor(
    private activeRoute:ActivatedRoute,
    private matDialog: MatDialog,
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




  openRegisterScenarioDialog(element: any){

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
            
          }
      })

  }




}
