import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmRemoveComponent } from '../confirm-remove/confirm-remove.component';
import { HttpClient } from '@angular/common/http';
import { snackBarConfig } from '../../../../../data/snackBarData';

@Component({
  selector: 'app-remove-lesson-dialog',
  templateUrl: './remove-lesson-dialog.component.html',
  styleUrl: './remove-lesson-dialog.component.scss'
})
export class RemoveLessonDialogComponent implements OnInit{


  constructor(
    public dialogRef: MatDialogRef<RemoveLessonDialogComponent>,
    private snackBar:MatSnackBar,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {
      lessonData:any;
      dataName: string;
    },
  ){}

  ngOnInit(): void {
   console.log(this.data.lessonData)
  }

  openConfirmRemoveDialog(lesson: any, index: number){

    let dialogRef = this.matDialog.open(ConfirmRemoveComponent,{
      disableClose: true,
      width:'468px',
      data:{
        lessonData: lesson,
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;

        if(this.data.dataName == 'Treinamentos'){
          this.removeTraining(model,index);
        }
        if(this.data.dataName == 'Disciplinas'){
          this.removeDiscipline(model,index);
        }
 

      }
    })

  }

  private removeTraining(model:any, index:number){

    this.httpClient.delete('http://localhost:3000/Trainings/' + model.id)
    .subscribe({
        next: (sample: any)=>{
          
          this.snackBar.open('Treinamento removido com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          //remove Discipline from modalView after success
          let array:[] = [];
          array = this.data.lessonData;
          array.splice(index,1);
          this.data.lessonData = array;
       

        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }
  private removeDiscipline(model:any, index:number){

    this.httpClient.delete('http://localhost:3000/Disciplines/' + model.id)
    .subscribe({
        next: (sample: any)=>{
          
          this.snackBar.open('Disciplina removida com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          //remove Discipline from modalView after success
          let array:[] = [];
          array = this.data.lessonData;
          array.splice(index,1);
          this.data.lessonData = array;

        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

}
