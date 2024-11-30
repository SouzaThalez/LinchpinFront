import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailSimulatorDialogComponent } from '../detail-simulator-dialog/detail-simulator-dialog.component';
import { simulatorCategoryType } from '../../../../../enums/simulatorCategory';
import { NewSimulatorDialogComponent } from '../new-simulator-dialog/new-simulator-dialog.component';

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
      height:'660px',
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

    this.httpClient.post('http://localhost:3000/mediumSimulators/',model).subscribe({
      next:(sample: any)=>{
        this.getMediumSimulators();
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }

  private getMediumSimulators(){

    this.httpClient.get('http://localhost:3000/mediumSimulators').subscribe({
      next:(sample: any)=>{
        this.mediumSimulators = sample;
        console.log('mediumSimulators: ',this.mediumSimulators);
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }

}
