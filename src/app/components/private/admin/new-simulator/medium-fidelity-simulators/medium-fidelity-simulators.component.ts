import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DetailSimulatorDialogComponent } from '../detail-simulator-dialog/detail-simulator-dialog.component';

@Component({
  selector: 'app-medium-fidelity-simulators',
  templateUrl: './medium-fidelity-simulators.component.html',
  styleUrl: './medium-fidelity-simulators.component.scss'
})
export class MediumFidelitySimulatorsComponent implements OnInit{

  mediumSimulators: any;

  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getMediumSimulators();
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

        let model = result;
        //Get DATA BASE ON THE SIMULATOR CATEGORY
        switch (model.simulatorCategory){
          case 'media':
            this.getMediumSimulators()

            break;
          case 'alta':
            // this.getHightSimulators();
          break;
        
          default:
            break;
        }
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
