import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ocorranceData } from '../../../../../../data/ocorranceData';
import { simulators } from '../../../../../../data/simulators';

@Component({
  selector: 'app-manitance-simulator-cards',
  templateUrl: './manitance-simulator-cards.component.html',
  styleUrl: './manitance-simulator-cards.component.scss'
})
export class ManitanceSimulatorCardsComponent implements OnInit{


  
  routeIndex:any;
  simulators = simulators.highFidelity;
  training:any;

  constructor(
    private activeRoute:ActivatedRoute,
    private matDialog: MatDialog,
  ){}

  ngOnInit(): void {
    console.log(this.simulators)
   this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      // this.training = this.trainingData[this.routeIndex];
      
   })


  }



  // openOcorranceDialog(){

  //   let dialogRef = this.matDialog.open(,{
  //     disableClose: true,
  //     width:'650px'
  //   })

  //   dialogRef.afterClosed().subscribe(result=>{
  //     if(result){
        
  //     }
  //   })
  // }


}
