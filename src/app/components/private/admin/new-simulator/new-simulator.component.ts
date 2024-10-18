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
  alta = 'alta';
  media = 'media';

  highSimulators: any;
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
    this.getHightSimulators();
  }

  getSimulatorData(element: number){
    this.value = element;

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
debugger
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
  private getHightSimulators(){

    this.httpClient.get('http://localhost:3000/highSimulators').subscribe({
      next:(sample: any)=>{
        this.highSimulators = sample
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }




}
