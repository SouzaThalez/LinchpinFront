import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../data/simulators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NewSimulatorDialogComponent } from './new-simulator-dialog/new-simulator-dialog.component';
import { HttpClient } from '@angular/common/http';
import { DetailSimulatorDialogComponent } from './detail-simulator-dialog/detail-simulator-dialog.component';

@Component({
  selector: 'app-new-simulator',
  templateUrl: './new-simulator.component.html',
  styleUrl: './new-simulator.component.scss'
})
export class NewSimulatorComponent implements OnInit{

  // midiumSimulators = simulators.mediumFidelity;
  mediumSimulators: any;

  highSimulators = simulators.highFidelity;
  lowCategories = simulators.lowFidelity;

  
  value:any;
  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient
  ){}
  
  ngOnInit(): void {
    console.log(this.lowCategories);
    this.getMediumSimulators();
  }

  getSimulatorData(element: number){
    this.value = element;
    // switch (element) {
    //   case 1:
    //     this.lowSimulatorsData = simulators.highFidelity;
    //     break;
    //     case 1:
    //     this.lowSimulatorsData = simulators.mediumFidelity;
    //       break;
    
    //   default:
    //     break;
    // }
  }

  openDetailSimulatorDialog(simulator:any){
      
    let dialogRef = this.matDialog.open(DetailSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        simulatorData:simulator,
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

  openNewSimulatorDialog(){

    let dialogRef = this.matDialog.open(NewSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{}
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
          debugger
          this.postMediumSimulators(result)
      }
    })
  }


  private getMediumSimulators(){

    this.httpClient.get('http://localhost:3000/mediumSimulators').subscribe({
      next:(sample: any)=>{
        this.mediumSimulators = sample
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }

  private postMediumSimulators(model:any){

    this.httpClient.post('http://localhost:3000/mediumSimulators/',model).subscribe({
      next:(sample: any)=>{
        console.log(sample)
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }



}
