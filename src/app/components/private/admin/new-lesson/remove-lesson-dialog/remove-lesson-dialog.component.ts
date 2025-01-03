import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmRemoveComponent } from '../confirm-remove/confirm-remove.component';
import { HttpClient } from '@angular/common/http';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { DocumentModel } from '../../../../../models/interface/documentModel';
import { Training } from '../../../../../models/training';

@Component({
  selector: 'app-remove-lesson-dialog',
  templateUrl: './remove-lesson-dialog.component.html',
  styleUrl: './remove-lesson-dialog.component.scss'
})
export class RemoveLessonDialogComponent implements OnInit {

  disciplines: DocumentModel[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<RemoveLessonDialogComponent>,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private initFirebaseService: InitiateFirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: {
      disciplineData: any;
      dataName: string;
    },
  ) { }

  ngOnInit(): void {
    this.getFireBaseDisciplines();
  }


  onClose(){
    this.dialogRef.close(false);
  }


  openConfirmRemoveDialog(lesson: any, index: number) {


    let dialogRef = this.matDialog.open(ConfirmRemoveComponent, {
      disableClose: true,
      width: '468px',
      data: {
        lessonData: lesson.documentData,
      }

    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let model = result;

        if (this.data.dataName == 'Treinamentos') {
          // this.removeTraining(model,index);
        }
        if (this.data.dataName == 'Disciplinas') {
          // this.removeDiscipline(model,index);
          this.removeFireBaseLesson(model, lesson.docID);

        }


      }
    })

  }

  // private removeTraining(model:any, index:number){

  //   this.httpClient.delete('http://localhost:3000/Trainings/' + model.id)
  //   .subscribe({
  //       next: (sample: any)=>{

  //         this.snackBar.open('Treinamento removido com sucesso!', 'Close', {
  //           horizontalPosition: snackBarConfig.horizontalPosition,
  //           verticalPosition: snackBarConfig.verticalPosition,
  //           duration: snackBarConfig.durationInSeconds * 1000 
  //         });
  //         //remove Discipline from modalView after success
  //         let array:[] = [];
  //         array = this.data.lessonData;
  //         array.splice(index,1);
  //         this.data.lessonData = array;


  //       },
  //       error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
  //   })
  // }
  // private removeDiscipline(model:any, index:number){

  //   this.httpClient.delete('http://localhost:3000/Disciplines/' + model.id)
  //   .subscribe({
  //       next: (sample: any)=>{

  //         this.snackBar.open('Disciplina removida com sucesso!', 'Close', {
  //           horizontalPosition: snackBarConfig.horizontalPosition,
  //           verticalPosition: snackBarConfig.verticalPosition,
  //           duration: snackBarConfig.durationInSeconds * 1000 
  //         });
  //         //remove Discipline from modalView after success
  //         let array:[] = [];
  //         array = this.data.lessonData;
  //         array.splice(index,1);
  //         this.data.lessonData = array;

  //       },
  //       error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
  //   })
  // }


  async removeFireBaseLesson(docModel: any, docIdRef: string): Promise<any> {
    
    try {
      const docRef = doc(this.initFirebaseService.getDb(), "Disciplines", docIdRef);
      await deleteDoc(docRef);
      
      this.getFireBaseDisciplines();

      return this.snackBar.open('Disciplina removida com sucesso!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000,
      });


    } catch (error) {

      return this.snackBar.open('ERRO em REMOVER a disciplina!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000
      });

    }
  }

  async getFireBaseDisciplines():Promise<void> {
       
           this.isLoading = true;
           this.disciplines = [];
       
           const q = query(collection(this.initFirebaseService.getDb(), "Disciplines"));
       
           const querySnapshot = await getDocs(q);
       
           querySnapshot.forEach((doc) => {
           
             const documentData = doc.data() as Training; 
             const docID = doc.id;
             this.disciplines.push({ docID: docID, documentData });
         
       
           });
       
           this.isLoading = false;
           console.log('Disciplinas, ',this.disciplines);
       
       
       
  }





}
