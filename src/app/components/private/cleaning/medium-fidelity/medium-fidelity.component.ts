import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../data/simulators';
import { MatDialog } from '@angular/material/dialog';
import { MediumCleaningDialogComponent } from './medium-cleaning-dialog/medium-cleaning-dialog.component';
import { DetailsDialogComponent } from '../../../shared/details-dialog/details-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-medium-fidelity',
  templateUrl: './medium-fidelity.component.html',
  styleUrl: './medium-fidelity.component.scss'
})
export class MediumFidelityComponent implements OnInit{

  mediumSimulators: any;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getMediumSimulators();
  }

  openMediumCleaningDialog(element: any){
    
    let dialogRef = this.matDialog.open(MediumCleaningDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        simulator: element
      }
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

  private getMediumSimulators(){

    this.httpClient.get('http://localhost:3000/mediumSimulators').subscribe({
      next:(sample: any)=>{
        this.mediumSimulators = sample;
      },
      error:(error)=>{
        console.log('Something wrong with the request to mediumSimulators ',error)
      }
    })
  }



}
