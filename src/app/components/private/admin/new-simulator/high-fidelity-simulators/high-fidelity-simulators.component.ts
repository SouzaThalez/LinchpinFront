import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewSimulatorDialogComponent } from '../new-simulator-dialog/new-simulator-dialog.component';
import { DetailSimulatorDialogComponent } from '../detail-simulator-dialog/detail-simulator-dialog.component';
import { simulatorCategoryType } from '../../../../enums/simulatorCategory';

@Component({
  selector: 'app-high-fidelity-simulators',
  templateUrl: './high-fidelity-simulators.component.html',
  styleUrl: './high-fidelity-simulators.component.scss'
})
export class HighFidelitySimulatorsComponent implements OnInit{

  simulatorType = simulatorCategoryType.high;
  highSimulators: any;


  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getHightSimulators();
  }


  openNewSimulatorDialog(){

    let dialogRef = this.matDialog.open(NewSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        simulatorCategory: this.simulatorType
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
       debugger
        let model = result;
        this.postHighSimulators(model);
    
        
      }
    })
  }

  openDetailSimulatorDialog(simulator:any){
      
    let dialogRef = this.matDialog.open(DetailSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'660px',
      data:{
        simulatorData:simulator,
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        //After removing Simulator get data again
        this.getHightSimulators();
       
      }
    })
  }

  private postHighSimulators(model:any){

    this.httpClient.post('http://localhost:3000/highSimulators/',model).subscribe({
      next:(sample: any)=>{
        this.getHightSimulators();
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }
  private getHightSimulators(){

    this.httpClient.get('http://localhost:3000/highSimulators').subscribe({
      next:(sample: any)=>{
        this.highSimulators = sample;
        console.log('highSimulators: ',this.highSimulators);
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }

}
