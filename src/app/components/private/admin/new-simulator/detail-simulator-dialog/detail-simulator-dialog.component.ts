import { Component, Inject, OnInit } from '@angular/core';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { EditCodeDialogComponent } from '../edit-code-dialog/edit-code-dialog.component';
import { DeleteCodeDialogComponent } from '../delete-code-dialog/delete-code-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-simulator-dialog',
  templateUrl: './detail-simulator-dialog.component.html',
  styleUrl: './detail-simulator-dialog.component.scss'
})
export class DetailSimulatorDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DetailSimulatorDialogComponent>,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}

  ngOnInit(): void {
    console.log(this.data.simulatorData)
  }


  openDeleteCodeDialog(code: any, position:number){

    let dialogRef = this.matDialog.open(DeleteCodeDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{simulatorCode:code}
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
      
        let array:[] = [];
        array = this.data.simulatorData.codes;
        array.splice(position,1);

        this.data.simulatorData.codes = array;
        let model = this.data.simulatorData;
        this.removeCode(model);

      }
    })
  }
  
  openEditCodeDialog(code: any, position:number){
  

    let dialogRef = this.matDialog.open(EditCodeDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'310px',
      data:{
        selectedCode: code,
        simulatorData: this.data.simulatorData,
        isEditCodeDialog: true,
        isNewCodeDialog: false
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
        this.data.simulatorData.codes[position].code = result;
        let model = this.data.simulatorData;
        this.updateCode(model)

      }
    })
  }

  openNewCodeDialog(){

    let dialogRef = this.matDialog.open(EditCodeDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'310px',
      data:{
        simulatorData: this.data.simulatorData,
        isNewCodeDialog: true,
        isEditCodeDialog: false
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
       
        let code = {
          code:'',
          disabled:false
        }

        code.code = result;
        this.data.simulatorData.codes.push(code);
        
    
        let model = this.data.simulatorData;
       
        this.addNewCode(model);
 

      }
    })
  }

  openRemoveSimulator(){

    let dialogRef = this.matDialog.open(DeleteCodeDialogComponent,{
      disableClose: true,
      width:'468px',
      
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
      
        debugger
      }
    })


  }

  private updateCode(model:any){
  
    this.httpClient.put('http://localhost:3000/mediumSimulators/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{
          
          this.snackBar.open('Código atualizado com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private removeCode(model:any){

    this.httpClient.put('http://localhost:3000/mediumSimulators/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{
          
          this.snackBar.open('Código removido com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });

        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private addNewCode(model:any){
    
    this.httpClient.put('http://localhost:3000/mediumSimulators/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{
          
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private removeSimulatorData(model:any){

    this.httpClient.delete('http://localhost:3000/mediumSimulators/' + model.id)
    .subscribe({
        next: (sample: any)=>{
          console.log('REMOVED> ',sample)
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

}
