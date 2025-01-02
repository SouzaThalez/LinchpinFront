import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonDialogComponent } from '../edit-lesson-dialog/edit-lesson-dialog.component';
import { NewCourseDialogComponent } from './new-course-dialog/new-course-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { Curse } from '../../../../../models/curse';
import { DocumentModel } from '../../../../../models/interface/documentModel';

@Component({
  selector: 'app-curses',
  templateUrl: './curses.component.html',
  styleUrl: './curses.component.scss'
})
export class CursesComponent implements OnInit{
  

  courses: DocumentModel[] = [];
  isLoading = false;
  trainingValue = 0;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private initFirebaseService: InitiateFirebaseService
  ){}

  
  ngOnInit(): void {
    this.getFireBaseCurses();
  }

  openEditLessonDialog(curse: DocumentModel){

    let dialogRef = this.matDialog.open(EditLessonDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{
        curse: curse.documentData,
        documentId: curse.docID
      }
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
      
      }
    })


  }
  
  
  openNewCourseDialog(){

    let dialogRef = this.matDialog.open(NewCourseDialogComponent,{
      disableClose: true,
      width:'468px',
      data:{}

    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
        let model = result;
        this.postFireBaseCurse(model);

      }
    })
  }


  async postFireBaseCurse(docData: any): Promise<any> {
   
         const documentId = `ahacurse-${docData.id}`;
  
        try {
          
          await setDoc(doc(this.initFirebaseService.getDb(), "Curses",documentId), docData);
          this.snackBar.open('Curso adicionado com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
  
         this.getFireBaseCurses();
          
        } catch (error) {
          console.error("Error writing document: ", error);
         
        }
  }
  
  async getFireBaseCurses():Promise<void> {
    
        this.isLoading = true;
        this.courses = [];
    
        const q = query(collection(this.initFirebaseService.getDb(), "Curses"));
    
        const querySnapshot = await getDocs(q);
    
        querySnapshot.forEach((doc) => {
         
          const documentData = doc.data() as Curse; 
          const docID = doc.id;
          this.courses.push({ docID: docID, documentData });
      
    
        });
    
        this.isLoading = false;
        console.log('Cursos, ',this.courses);
    
    
    
  }
  
  



}
