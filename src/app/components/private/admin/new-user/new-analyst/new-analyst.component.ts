import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../../enums/userRoles';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../../models/user';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';
import { DocumentModel } from '../../../../../models/interface/documentModel';

@Component({
  selector: 'app-new-analyst',
  templateUrl: './new-analyst.component.html',
  styleUrl: './new-analyst.component.scss'
})
export class NewAnalystComponent implements OnInit{


  // analystUsers: any;
  analystUsers: DocumentModel[] = [];
  isLoading = false; 
  userAnalystRole = userRoleType.analyst;
  userImage = userDefaultImagesType.defaultAnalystImage;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private initFirebaseService: InitiateFirebaseService
  ){}

  ngOnInit(): void {
    this.getFireBaseAnalysts();
  }

  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        role: this.userAnalystRole,
        image:this.userImage
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
        this.postFireBaseAnalystUser(model);
       
      }
    })


  }

  openEditUserDialog(user: DocumentModel){

    let dialogRef = this.matDialog.open(EditUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        user: user.documentData,
        documentId: user.docID
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      
      //if result false, dialog coming from remove. Update users!
      if(result){

        if(result == 'remove'){
          this.getFireBaseAnalysts();
          this.snackBar.open('Usuário removido com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          return
        }

        let model = result;
        let docIdUpdated =`${model.role}-${model.id}`;

        this.updateFireBaseAnalystUser(model,docIdUpdated);
       
      }
     
    })
  }

  async updateFireBaseAnalystUser(docData: any, docIdRef: string): Promise<any> {
      
      try {
  
        const docRef = doc(this.initFirebaseService.getDb(), "Users", docIdRef);
  
        await updateDoc(docRef, docData);
        this.analystUsers = [];

        this.getFireBaseAnalysts();
        
        return this.snackBar.open('Usuário atualizado com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });
        
        
  
      } catch (error) {
    
        return this.snackBar.open('ERRO em atualização do usuário!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });
        
      }
  }

  async postFireBaseAnalystUser(docData: any): Promise<any> {

       const documentId = `${this.userAnalystRole}-${docData.id}`;

      try {

        await setDoc(doc(this.initFirebaseService.getDb(), "Users",documentId), docData);
        this.snackBar.open('Usuário adicionado com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });

        this.getFireBaseAnalysts();
      
       
      } catch (error) {
        console.error("Error writing document: ", error);
        
      }
  }
  
  async getFireBaseAnalysts():Promise<void> {
  
      this.isLoading = true;
      this.analystUsers = [];
  
      const q = query(collection(this.initFirebaseService.getDb(), "Users"), where("role", "==", this.userAnalystRole));
  
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
       
        const documentData = doc.data() as User; 
        const docID = doc.id;
        this.analystUsers.push({ docID: docID, documentData });
    
  
      });
  
      this.isLoading = false;
      console.log('Analistas> ',this.analystUsers)
  
  
  
  }


}
