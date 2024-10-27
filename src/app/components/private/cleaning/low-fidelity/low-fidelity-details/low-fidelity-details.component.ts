import { Component, OnInit } from '@angular/core';
import { LowFidelityCleaningDialogComponent } from '../low-fidelity-cleaning-dialog/low-fidelity-cleaning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { simulators } from '../../../../../data/simulators';
import { DetailsDialogComponent } from '../../../../shared/details-dialog/details-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-low-fidelity-details',
  templateUrl: './low-fidelity-details.component.html',
  styleUrl: './low-fidelity-details.component.scss'
})
export class LowFidelityDetailsComponent implements OnInit{

  routeIndex: string;
  routeName:string;
  lowSimulatorsData: any;
  lowSimulators: Array<any> = [];
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getLowSimulators();
    this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      this.getLowSimulators();
      
   })
  }


  openLowCleaningDialog(element:any){

    let dialogRef = this.matDialog.open(LowFidelityCleaningDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{simulator:element}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
    
  }

  openDetailsPanel(element:any){

    let dialogRef = this.matDialog.open(DetailsDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        simulator:element,
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

  private getLowSimulators(){

    this.httpClient.get('http://localhost:3000/lowSimulators').subscribe({
      next:(sample: any)=>{
        this.lowSimulatorsData = sample;
        this.lowSimulators = this.lowSimulatorsData[this.routeIndex].simulators;
        this.routeName = this.lowSimulatorsData[this.routeIndex].simulatorClass;
        this.isLoading = true;
       
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }

}
