import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DetailClassSimulatorDialogComponent } from '../detail-class-simulator-dialog/detail-class-simulator-dialog.component';
import { NewSimulatorDialogComponent } from '../new-simulator-dialog/new-simulator-dialog.component';
import { NewClassSimulatorDialogComponent } from '../new-class-simulator-dialog/new-class-simulator-dialog.component';

@Component({
  selector: 'app-low-fidelity-simulators',
  templateUrl: './low-fidelity-simulators.component.html',
  styleUrl: './low-fidelity-simulators.component.scss'
})
export class LowFidelitySimulatorsComponent implements OnInit{

  lowSimulators: any;

  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getLowSimulators();
  }

  openDetailClassSimulatorDialog(simulator:any){
      
    let dialogRef = this.matDialog.open(DetailClassSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'660px',
      data:{
        simulatorData:simulator,
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        debugger
        let model = result;
     
      }
    })
  }

  openNewClassSimulatorDialog(){
    let dialogRef = this.matDialog.open(NewClassSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        // simulatorCategory: value
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
       
        let model = result;
        this.postLowClassSimulator(model);
        
      }
    })
  }


  private postLowClassSimulator(model:any){

    this.httpClient.post('http://localhost:3000/lowSimulators/',model).subscribe({
      next:(sample: any)=>{
        // this.getMediumSimulators();
        this.getLowSimulators();
      },
      error:(error)=>{
        console.log('Something wrong with the request to lowSimulators ',error)
      }
    })
  }

  private getLowSimulators(){

    this.httpClient.get('http://localhost:3000/lowSimulators').subscribe({
      next:(sample: any)=>{
        this.lowSimulators = sample;
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }




}
