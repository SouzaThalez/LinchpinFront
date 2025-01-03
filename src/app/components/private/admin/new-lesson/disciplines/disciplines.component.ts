import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonDialogComponent } from './edit-lesson-dialog/edit-lesson-dialog.component';
import { NewLessonDialogComponent } from '../new-lesson-dialog/new-lesson-dialog.component';
import { NewDisciplineDialogComponent } from './new-discipline-dialog/new-discipline-dialog.component';
import { RemoveLessonDialogComponent } from '../remove-lesson-dialog/remove-lesson-dialog.component';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { DocumentModel } from '../../../../../models/interface/documentModel';
import { Training } from '../../../../../models/training';
import { Lesson } from '../../../../../models/lesson';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.scss'
})
export class DisciplinesComponent implements OnInit {

  disciplines: DocumentModel[] = [];
  isLoading = false;
  trainingValue = 0;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private initFirebaseService: InitiateFirebaseService
  ) { }


  ngOnInit(): void {
   this.getFireBaseDisciplines();
  }


  openNewDisciplineDialog() {

    let dialogRef = this.matDialog.open(NewDisciplineDialogComponent, {
      disableClose: true,
      width: '468px',
      data: {}

    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let model = result;
        this.postFireBaseDiscipline(model);


      }
    })
  }

  openNewLessonDialog() {

    let dialogRef = this.matDialog.open(NewLessonDialogComponent, {
      disableClose: true,
      width: '468px',
      data: {
        trainingData: this.disciplines,
        dialogType:'Disciplina'
      }

    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let model = result;
        debugger
        this.postFireBaseLesson(model.modelData,model.documentId)
      }
    })

  }

  openEditLessonDialog(lesson: Lesson, documentId: string) {

  
    let dialogRef = this.matDialog.open(EditLessonDialogComponent, {
      disableClose: true,
      width: '468px',
      data:{
        lesson: lesson,
        documentId: documentId
      }
  

    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        let model = result;
        const convertedDate = moment(model.updateDate).format('DD-MM-YYYY');
        model.updateDate = convertedDate;

        this.updateFireBaseLesson(model,documentId);
      }
    })


  }








  openRemoveLessonDialog() {

    let dialogRef = this.matDialog.open(RemoveLessonDialogComponent, {
      disableClose: true,
      width: '468px',
      data: {
        lessonData: this.disciplines,
        dataName: 'Disciplinas'
      }

    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let model = result;



      }
    })

  }



  async postFireBaseDiscipline(docData: any): Promise<any> {
  
      const documentId = `discipline-${docData.id}`;

      try {

        await setDoc(doc(this.initFirebaseService.getDb(), "Disciplines", documentId), docData);

        this.snackBar.open('Disciplina adicionada com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000
        });

        this.getFireBaseDisciplines();

      } catch (error) {
        console.error("Error writing document: ", error);

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

  async postFireBaseLesson(docModel: any, docIdRef: string): Promise<any> {
   
        try {
    
          const docRef = doc(this.initFirebaseService.getDb(), "Disciplines", docIdRef);
    
          await updateDoc(docRef, docModel);
          this.disciplines = [];
  
          this.getFireBaseDisciplines();
          
          return this.snackBar.open('Aula adicionada com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          
          
    
        } catch (error) {
      
          return this.snackBar.open('ERRO em adicionar a aula!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          
        }
  }
  
  async updateFireBaseLesson(docModel: any, docIdRef: string): Promise<any> {
   
    try {

      const docRef = doc(this.initFirebaseService.getDb(), "Disciplines", docIdRef);

      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){

        const disciplineData = docSnap.data();
        const lessons = disciplineData['lessons'] || [];

        const foundLessonIndex = lessons.findIndex((element)=> element.id == docModel.id);

        if (foundLessonIndex !== -1) {

          lessons[foundLessonIndex] = { ...lessons[foundLessonIndex], ...docModel };
         
          await updateDoc(docRef, {
            lessons: lessons,
          });

          this.getFireBaseDisciplines();

          return this.snackBar.open('Aula atualizada com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000,
          });

        } else {
          throw new Error('Lesson not found');
        } 
      } else {
        throw new Error('Discipline not found');
      }


    } catch (error) {
  
      return this.snackBar.open('ERRO em atualizar a aula!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      
    }
  }



}
