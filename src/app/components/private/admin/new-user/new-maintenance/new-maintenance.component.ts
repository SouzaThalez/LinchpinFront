import { Component, OnInit } from '@angular/core';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userRoleType } from '../../../../../enums/userRoles';
import { User } from '../../../../../models/user';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { UserDocumentModel } from '../../../../../models/interface/userDocModel';

@Component({
  selector: 'app-new-maintenance',
  templateUrl: './new-maintenance.component.html',
  styleUrl: './new-maintenance.component.scss'
})
export class NewMaintenanceComponent implements OnInit{


  // manitenceUsers: any;
  manitenceUsers: UserDocumentModel[] = [];
  isLoading = false; 
  userManitenceRole = userRoleType.maintenance; 
  userImage = userDefaultImagesType.defaultMaintenanceImage;

  constructor(
    private matDialog: MatDialog,
    private snackBar:MatSnackBar,
     private initFirebaseService: InitiateFirebaseService
  ){}

  ngOnInit(): void { 
    this.getFireBaseManitenceUsers();
  }


  openEditUserDialog(user: UserDocumentModel){
  
    let dialogRef = this.matDialog.open(EditUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        user: user.userData,
        documentId: user.docID
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
  
      //if result is remove. update users
      if(result){

        if(result == 'remove'){

          this.getFireBaseManitenceUsers();
          this.snackBar.open('Usuário removido com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          return
        }
        
        let model = result;
        let docIdUpdated =`${model.role}-${model.id}`;
        
        this.updateFireBaseManitenceUser(model,docIdUpdated);
       
      }
      
    })

    
  }
  
  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        role: this.userManitenceRole,
        image:this.userImage,
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){

        let model = result;
        this.postFireBaseManitenceUser(model);
       
      }
    })


  }

  async updateFireBaseManitenceUser(docModel: any, docIdRef: string): Promise<any> {
      
      try {
  
        const docRef = doc(this.initFirebaseService.getDb(), "Users", docIdRef);
  
        await updateDoc(docRef, docModel);
        this.manitenceUsers = [];
        this.getFireBaseManitenceUsers();
        
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

  async postFireBaseManitenceUser(docData: any): Promise<any> {
  
       const documentId = `${this.userManitenceRole}-${docData.id}`;

      try {
        
        await setDoc(doc(this.initFirebaseService.getDb(), "Users",documentId), docData);
        this.snackBar.open('Usuário adicionado com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });

        this.getFireBaseManitenceUsers();
        
      } catch (error) {
        console.error("Error writing document: ", error);
       
      }
  }

  async getFireBaseManitenceUsers():Promise<void> {
  
      this.isLoading = true;
      this.manitenceUsers = [];
  
      const q = query(collection(this.initFirebaseService.getDb(), "Users"), where("role", "==", this.userManitenceRole));
  
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
       
        const userData = doc.data() as User; 
        const docID = doc.id;
        this.manitenceUsers.push({ docID: docID, userData });
    
  
      });
  
      this.isLoading = false;
      console.log('Manutenção> ',this.manitenceUsers);
  
  
  
  }





}
