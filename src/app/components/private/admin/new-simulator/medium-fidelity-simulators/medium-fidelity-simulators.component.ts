import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailSimulatorDialogComponent } from '../detail-simulator-dialog/detail-simulator-dialog.component';
import { simulatorCategoryType } from '../../../../../enums/simulatorCategory';
import { NewSimulatorDialogComponent } from '../new-simulator-dialog/new-simulator-dialog.component';

import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-medium-fidelity-simulators',
  templateUrl: './medium-fidelity-simulators.component.html',
  styleUrl: './medium-fidelity-simulators.component.scss'
})
export class MediumFidelitySimulatorsComponent implements OnInit{

  mediumSimulators: any;
  simulatorType = simulatorCategoryType.medium;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getMediumSimulators();
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
      
        let model = result;
        this.postMediumSimulators(model);  
      }
    })
  }
    
  openDetailSimulatorDialog(simulator:any){
      
    let dialogRef = this.matDialog.open(DetailSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'624px',
      data:{
        simulatorData:simulator,
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
      //After removing Simulator get data again
        this.getMediumSimulators();
      
      }
    })
  }


  private postMediumSimulators(model:any){

    this.httpClient.post(environment.apiUrl + '/simulators/',model).subscribe({
      next:(sample: any)=>{
        this.getMediumSimulators();
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }

  private getMediumSimulators(){

    this.httpClient.get(environment.apiUrl + '/simulators?category=media').subscribe({
      next:(sample: any)=>{
        this.mediumSimulators = sample;
        
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }

}
