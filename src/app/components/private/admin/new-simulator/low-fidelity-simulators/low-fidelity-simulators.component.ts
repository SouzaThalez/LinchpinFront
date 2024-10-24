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

        let model = result;
        //Get DATA BASE ON THE SIMULATOR CATEGORY
        switch (model.simulatorCategory){
          case 'media':
            this.getMediumSimulators()

            break;
          case 'alta':
            this.getHightSimulators();
          break;
        
          default:
            break;
        }
      }
    })
  }

  openNewSimulatorDialog(value:string){

    let dialogRef = this.matDialog.open(NewSimulatorDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        simulatorCategory: value
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
       
        let model = result;
        //Update DATA BASE ON THE SIMULATOR CATEGORY
        switch (model.simulatorCategory){
          case 'media':
            this.postMediumSimulators(model);

            break;
          case 'alta':
            this.postHighSimulators(model);
          break;
        
          default:
            break;
        }
        
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

  private getMediumSimulators(){

    this.httpClient.get('http://localhost:3000/mediumSimulators').subscribe({
      next:(sample: any)=>{
        // this.mediumSimulators = sample;
        // console.log('mediumSimulators: ',this.mediumSimulators);
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }
  private getHightSimulators(){

    this.httpClient.get('http://localhost:3000/highSimulators').subscribe({
      next:(sample: any)=>{
        // this.highSimulators = sample;
        // console.log('highSimulators: ',this.highSimulators);
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
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
