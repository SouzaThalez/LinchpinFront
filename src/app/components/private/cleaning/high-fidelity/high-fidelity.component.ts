import { Component, OnInit } from '@angular/core';
import { simulators } from '../../../../data/simulators';
import { MatDialog } from '@angular/material/dialog';
import { HighCleaningDialogComponent } from './high-cleaning-dialog/high-cleaning-dialog.component';
import { DetailsDialogComponent } from '../../../shared/details-dialog/details-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-high-fidelity',
  templateUrl: './high-fidelity.component.html',
  styleUrl: './high-fidelity.component.scss'
})
export class HighFidelityComponent implements OnInit{

  highSimulators: any;
  
  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getHightSimulators();
  }

  openHighCleaningDialog(element: any){

    let dialogRef = this.matDialog.open(HighCleaningDialogComponent,{
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

  private getHightSimulators(){

    this.httpClient.get('http://localhost:3000/highSimulators').subscribe({
      next:(sample: any)=>{
        this.highSimulators = sample;
        
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }


}
