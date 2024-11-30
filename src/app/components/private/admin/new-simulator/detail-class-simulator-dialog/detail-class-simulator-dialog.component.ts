import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemoveSimulatorDialogComponent } from './remove-simulator-dialog/remove-simulator-dialog.component';
import { NewSimulatorDialogComponent } from '../new-simulator-dialog/new-simulator-dialog.component';
import { simulatorCategoryType } from '../../../../../enums/simulatorCategory';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { RemoveClassDialogComponent } from './remove-class-dialog/remove-class-dialog.component';

@Component({
  selector: 'app-detail-class-simulator-dialog',
  templateUrl: './detail-class-simulator-dialog.component.html',
  styleUrl: './detail-class-simulator-dialog.component.scss'
})
export class DetailClassSimulatorDialogComponent implements OnInit{
  
  simulatorType = simulatorCategoryType.low;
  lowSimulators:any;

  constructor(
    public dialogRef: MatDialogRef<DetailClassSimulatorDialogComponent>,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}

  ngOnInit(): void {
    // console.log('DATAAAAAA',this.data.simulatorData)
  }

  closeDialog(value?: any){
    this.dialogRef.close(value);
  }

  openRemoveSimulatorDialog(simulator:any, index:number){
    
  let dialogRef = this.matDialog.open(RemoveSimulatorDialogComponent,{
    disableClose: true,
    width: '540px',
    height:'510px',
    data:{
      simulatorData:simulator,
    }

  })

  dialogRef.afterClosed().subscribe(result=>{
    if(result){
     
      this.data.simulatorData.simulators.splice(index,1);
      let model =  this.data.simulatorData;
      this.removeLowSimulators(model);

    }
  })

  }

  openRemoveClassDialog(){

    let dialogRef = this.matDialog.open(RemoveClassDialogComponent,{
      disableClose: true,
      width: '540px',
      height:'510px',
      data:{
        simulatorData:this.data.simulatorData,
      }
  
    })
  
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
        debugger
        this.removeClassSimulator(model);
        
  
      }
    })
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
        if(model.simulatorCategory == this.simulatorType){
          this.data.simulatorData.simulators.push(model);
          this.updateLowSimulators(this.data.simulatorData);
        }
     
        
      }
    })
  }

  private updateLowSimulators(model:any){
   
    this.httpClient.put('http://localhost:3000/lowSimulators/' + model.id, model).subscribe({
      next:(sample: any)=>{
        // this.getHightSimulators();
        this.snackBar.open('Simulador adicionado com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });
      },
      error:(error)=>{
        console.log('Something wrong with the request to lowSimulators ',error)
      }
    })
  }
  
  private removeLowSimulators(model:any){

   //UPDATING DATA
    this.httpClient.put('http://localhost:3000/lowSimulators/' + model.id, model).subscribe({
      next:(sample: any)=>{
     
        this.snackBar.open('Simulador removido com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });
      },
      error:(error)=>{
        console.log('Something wrong with the request to lowSimulators ',error)
      }
    })
  }

  
  private removeClassSimulator(model:any){

    this.httpClient.delete('http://localhost:3000/lowSimulators/' + model.id)
    .subscribe({
        next: (sample: any)=>{

          this.snackBar.open('Classe removida com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          this.dialogRef.close();
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }



  private getLowSimulators(){

    this.httpClient.get('http://localhost:3000/lowSimulators/').subscribe({
      next:(sample: any)=>{
        this.lowSimulators = sample;
        // this.getHightSimulators();
      },
      error:(error)=>{
        console.log('Something wrong with the request to lowSimulators ',error)
      }
    })
  }

}
